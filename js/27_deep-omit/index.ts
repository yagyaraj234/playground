export default function deepOmit(value: unknown, keys: string[]): unknown {
  // array case
  if (Array.isArray(value)) {
    return value.map((item) => deepOmit(item, keys));
  }

  // object case
  if (value !== null && typeof value === "object") {
    const result: Record<string, unknown> = {};

    for (const [key, val] of Object.entries(value)) {
      if (!keys.includes(key)) {
        result[key] = deepOmit(val, keys);
      }
    }

    return result;
  }

  // primitive case
  return value;
}

console.log(deepOmit({ a: 1, b: 2, c: 3 }, ["b"])); // { a: 1, c: 3 }
const obj = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: 4,
  },
  f: [5, 6],
};
console.log(deepOmit(obj, ["b", "c", "e"])); // { a: 1, f: [5, 6] }
