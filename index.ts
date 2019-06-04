// Import creation operators here
import { merge, of, interval } from 'rxjs'; 

// Import pipeable operator here
import { partition, repeat, concatMap, bufferCount, map, delay, take, share, filter } from 'rxjs/operators';

// The source observable has been created for you.
// You can NOT change this
const source = 
  interval(1000) // emits values with interval of 1s
  .pipe(
    delay(3000), // delaying first emittion by 3s
    take(100), // taking max of 100
    map(element => Math.floor(1 + (Math.random() * 100))), // turn each emittion into a random number between 1 and 100
    share() // sharing the emittions to multiple observers
  );

  // filter out ending of 0 and 5
  // take only 30
  const filtering = source.pipe(
    filter(x => x % 5 !== 0 && x % 10 !== 0)
  );
  
  const evens = filtering.pipe(
    filter(x => x % 2 === 0)
  );

  const odds = filtering.pipe(
    filter(x => x % 2 !== 0),
    bufferCount(3)
  )

  const doubleEven = merge(
    evens,
    evens
  )

  const merging = merge(
    doubleEven,
    odds
  )

  const solution = merging.pipe(
    take(30)
  )

  solution.subscribe(
    x => console.log(x),
    error => console.error(error),
    () => console.log("complete")
  )

// uncomment this to check what the source stream emits
