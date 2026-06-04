function filterNestedObj(
  obj: Record<string, any>,
  filter: (val: any) => boolean,
) {
  function traverse(obj: Record<string, any>) {
    if (typeof obj !== "object" || obj === null) return obj;

    if (typeof obj === "object" && obj !== null) {
      const keys = Object.keys(obj);

      keys.forEach((it) => {
        const item = obj[it];
        if (typeof item === "object") {
          obj[it] = traverse(item);
          if (Object.keys(obj[it]).length === 0) {
            delete obj[it];
          }
        } else {
          if (!filter(obj[it])) {
            delete obj[it];
          }
        }
      });

      return obj;
    }
  }

  return traverse(obj);
}

const user = {
  a: 1,
  b: {
    c: "Hello World",
    d: 2,
    e: {
      f: {
        g: -4,
      },
    },
    h: "Good Night Moon",
  },
};

const filter = (s: any) => typeof s === "string";
console.log(filterNestedObj(user, filter));

// Output:
// {
//   b: {
//     c: "Hello World",
//     h: "Good Night Moon",
//   }
// };
