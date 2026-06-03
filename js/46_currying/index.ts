function curry(...arg: any[]) {
  return function curried(...args: any[]) {
    if (args.length === 0) {
      return arg.reduce((acc, i) => {
        return acc + i;
      }, 0);
    }

    arg.push(...args);
    return curried;
  };
}

function curryWithCallback(callback: (...args: any[]) => number) {
  return function curry(...args: any) {
    if (args.length >= callback.length) {
      return callback(...args);
    }
    return function (...moreArgs: any[]) {
      return curry(...args, ...moreArgs);
    };
  };
}

const multiply = (a: number, b: number, c: number, d: number, e: number) => {
  return a * b * c * d * e;
};

// @ts-ignore
console.log(curryWithCallback(multiply)(3, 4, 6)(4)(2));

console.log(curry(8)(4)(12)());
