export default function classNames<T>(...args: T[]) {
  let className = "";

  const items = args.flat(Infinity);

  items.forEach((i) => {
    if (!i) return;
    if (typeof i === "string") {
      className += ` ${i}`;
    } else {
      const keys = Object.keys(i);
      if (keys.length > 0) {
        keys.forEach((element) => {
          if (i[element]) {
            className += ` ${element}`;
          }
        });
      }
    }
  });
  return className;
}

const item = ["a", ["b", { c: true, d: false }], { abc: true }].flat(Infinity);

console.log(item);

console.log("className --->", classNames(item));
