const composeFn =
  (...functions: any[]) =>
  (...args: any) => {
    const [curr, ...rest] = functions.reverse();

    return rest.reduce(
      (acc, fn) => {
        return fn(acc);
      },
      curr(...args),
    );
  };

const add = (...args: any[]) => {
  return args.reduce((acc, curr) => acc + curr, 0);
};

const factorial = (num: number) => {
  if (num <= 1) {
    return 1;
  }
  let ans = 1;
  for (let l = num; l > 1; l--) {
    ans *= l;
  }
  return ans;
};

const divide = (num: number) => {
  return num / 10;
};

console.log(composeFn(factorial, divide, add)(10, 30));
