const composeAsync =
  (...fns: Function[]) =>
  (...args: any[]) => {
    const [first, ...rest] = [...fns].reverse();
    return rest.reduce(
      (promise, fn) => promise.then((result) => fn(result)),
      first(...args),
    );
  };

// Input:
function a(x, y) {
  return new Promise((resolve) => setTimeout(() => resolve(x * y), 100));
}

function b(z) {
  return new Promise((resolve, reject) =>
    setTimeout(() => resolve(z + 5), 100),
  );
}

function c(r) {
  return new Promise((resolve) => setTimeout(() => resolve(r / 10), 100));
}

// create this function
composeAsync(
  c,
  b,
  a,
)(100, 3)
  .then((result) => {
    console.log(result);
  })
  .catch(console.error);

// Output:
// 2
