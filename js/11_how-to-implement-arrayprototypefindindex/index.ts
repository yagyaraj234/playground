function findIndex<T>(
  arr: T[],
  predicate: (item: T, index: number, array: T[]) => boolean,
): number {
  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i], i, arr)) return i;
  }
  return -1; // return -1 when not found
}

const items = [1, 2, 34, 4, 3, "43", 432, 4, 1, "42", 4, 4, 12, 4, 543, 43, 3];

// Find by value
console.log(findIndex(items, (x) => x === "43"));

//  by condition
console.log(findIndex(items, (x) => parseInt(x) > 100));

// Not found
console.log(findIndex(items, (x) => x === 999));
