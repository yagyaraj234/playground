const isPureObject = (a: unknown) => {
  return Object.prototype.toString.call(a) === "[object Object]";
};

export default function deepEqual(valueA: unknown, valueB: unknown): boolean {
  if (valueA === valueB) {
    return true;
  }

  // arrays
  if (Array.isArray(valueA) && Array.isArray(valueB)) {
    if (valueA.length !== valueB.length) {
      return false;
    }

    return valueA.every((item, index) => deepEqual(item, valueB[index]));
  }

  // objects
  if (isPureObject(valueA) && isPureObject(valueB)) {
    const keysA = Object.keys(valueA);
    const keysB = Object.keys(valueB);

    if (keysA.length !== keysB.length) {
      return false;
    }

    for (let i = 0; i < keysA.length; i++) {
      const key = keysA[i];

      // key existence check
      if (!Object.hasOwn(valueB, key)) {
        return false;
      }

      // recursive comparison
      if (!deepEqual(valueA[key], valueB[key])) {
        return false;
      }
    }

    return true;
  }

  return false;
}

console.log(deepEqual([{ foo: 1 }], [{ foo: 1 }]));
console.log(deepEqual([{}], [{}]));
console.log(
  deepEqual(
    { foo: "bar", item: [1, 2, { baz: "baz" }] },
    { foo: "bar", item: [1, 2, { baz: "baz" }] },
  ),
);
