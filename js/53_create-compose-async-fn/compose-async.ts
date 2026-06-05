function composeAsyncMethod(...functions: any[]) {
  return function (...args: any[]) {
    const [first, ...rest] = (functions || []).reverse();

    return rest.reduce(
      (curr, fn) => {
        return curr.then((res: number) => fn(res));
      },
      first(...args),
    );
  };
}

// Input:
function a(x: number, y: number) {
  return new Promise((resolve) => setTimeout(() => resolve(x * y), 100));
}

function b(z: number) {
  return new Promise((resolve, reject) =>
    setTimeout(() => resolve(z + 5), 100),
  );
}

function c(r: number) {
  return new Promise((resolve) => setTimeout(() => resolve(r / 10), 100));
}

// create this function
composeAsyncMethod(
  c,
  b,
  a,
)(10, 3)
  .then((result) => {
    console.log(result);
  })
  .catch(console.error);
