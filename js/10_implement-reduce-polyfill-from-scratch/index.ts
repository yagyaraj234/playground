// Implement Reduce Polyfill from Scratch | Frontend Problem Solving

function Reduce<T, U>(
  arr: T[],
  callback: (acc: U, curr: T, i: number, arr: T[]) => U,
  acc: U,
) {
  for (let i = 0; i < arr.length; i++) {
    const curr = arr[i];
    acc = callback(acc, curr, i, arr);
  }

  return acc;
}

const ArrayITEM = [1, 2, 34, 4, 3, 43, 432, 4, 1, 42, 4, 4, 12, 4, 543, 43, 3];

console.log(
  Reduce(
    ArrayITEM,
    (acc, item) => {
      return acc + item;
    },
    0,
  ),
);
