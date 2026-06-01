function isPlainObject(value: any) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function pipe<T>(obj: Record<string, T>) {
  function traverse(obj: any, ...args: any[]) {
    Object.keys(obj).forEach((i) => {
      const item = obj[i];
      if (typeof item === "function") {
        obj[i] = item(...args);
      } else if (isPlainObject(item)) {
        obj[i] = traverse(item, ...args);
      }
    });
    return obj;
  }
  return function (...args: any[]) {
    return traverse(obj, ...args);
  };
}

const obj = {
  a: {
    b: (a: number, b: number, c: number) => a + b + c,
    c: (a: number, b: number, c: number) => a + b - c,
  },
  d: (a: number, b: number, c: number) => a - b - c,
};

const output = pipe(obj)(1, 1, 1);
console.log(output);

const fn = obj.a.b;
if (typeof fn === "function") {
  console.log(fn(1, 2, 3));
}
