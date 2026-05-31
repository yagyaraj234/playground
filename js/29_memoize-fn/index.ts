type Fn = (...args: any[]) => any;

export default function memoize(func: Fn): Fn {
  let lastArgs: any[] | null = null;
  let lastResult: any;

  return function (this: any, ...args: any[]) {
    if (
      lastArgs &&
      lastArgs.length === args.length &&
      lastArgs.every((arg, i) => arg === args[i])
    ) {
      return lastResult;
    }

    lastArgs = args;
    lastResult = func.apply(this, args);

    return lastResult;
  };
}

function expensiveFunction(n: any) {
  console.log("Computing...");
  return n * 2;
}

// Create a memoized version of the function.
const memoizedExpensiveFunction = memoize(expensiveFunction);

// First call (computes and caches the result).
console.log(memoizedExpensiveFunction(5)); // Output: Computing... 10

// Second call with the same argument (returns the cached result).
console.log(memoizedExpensiveFunction(5)); // Output: 10

// Third call with a different argument (computes and caches the new result).
console.log(memoizedExpensiveFunction(10)); // Output: Computing... 20

// Fourth call with the same argument as the third call (returns the cached result).
console.log(memoizedExpensiveFunction(10)); // Output: 20
