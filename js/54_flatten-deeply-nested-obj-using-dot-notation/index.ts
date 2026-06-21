function isPlainObject(input: Record<string, any>) {
  return typeof input === "object" && input !== null && input !== undefined;
}

function flatten(obj: Record<string, any>) {
  const result: Record<string, any> = {};

  function traverse(input: Record<string, any>, parent: string) {
    if (isPlainObject(input)) {
      Object.keys(input).forEach((key) => {
        const dotKey = parent ? `${parent}.${key}` : key;
        if (isPlainObject(input[key])) {
          traverse(input[key], dotKey);
        } else {
          result[dotKey] = input[key];
        }
      });
    }
  }

  traverse(obj, "");
  return Object.fromEntries(
    Object.entries(result).sort(([a], [b]) => a.localeCompare(b)),
  );
}

// Input:
const nested = {
  A: "12",
  B: 23,
  C: {
    P: 23,
    O: {
      L: 56,
    },
    Q: [1, 2],
  },
};

console.log(flatten(nested));

// Output:
// {
//   "A": "12"
//   "B": 23,
//   "C.O.L": 56,
//   "C.P": 23,
//   "C.Q.0": 1,
//   "C.Q.1": 2,
// }
