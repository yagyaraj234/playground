function filter<T>(arr: T[], callback: Function) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    const curr = arr[i];
    let res = callback(curr);
    if (res) {
      result.push(curr);
    }
  }
  return result;
}

const items = [1, 2, 34, 4, 3, 43, 432, 4, 1, 42, 4, 4, 12, 4, 543, 43, 3];

const result = filter(items, (item: any) => {
  return item % 2 == 0;
});

console.log("result ----> ", result);

// custom filter
// Array.prototype.filter = filter;
