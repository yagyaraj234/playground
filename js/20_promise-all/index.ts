export default function promiseAll<T extends readonly unknown[] | []>(
  iterable: T,
): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }> {
  return new Promise((res, rej) => {
    if (iterable.length == 0) {
      res([]);
      return;
    }

    const result = new Array(iterable.length);

    let resolved = 0;

    iterable.map((item, idx) => {
      Promise.resolve(item)
        .then((data) => {
          result[idx] = data;
          resolved++;
          if (resolved === iterable.length) {
            res(result);
          }
        })
        .catch((e) => {
          rej(e);
        });
    });
  });
}
