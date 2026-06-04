function get(obj: Record<string, any>, key: string, defaultValue?: any) {
  const keys = key.split(/[.[\]]/).filter(Boolean);

  let result = obj;
  for (const k of keys) {
    if (result == null) return defaultValue; // null or undefined guard
    result = result[k];
  }

  return result ?? defaultValue;
}

// Input:

const obj = {
  a: {
    b: {
      c: [1, 2, 3],
    },
  },
};

console.log(get(obj, "a.b.c"));
console.log(get(obj, "a.b.c.0"));
console.log(get(obj, "a.b.c[1]"));
console.log(get(obj, "a.b.c[3]"));
