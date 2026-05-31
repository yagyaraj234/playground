export default function promiseAny<T>(iterable: Array<T>): Promise<T> {
  return new Promise((res, rej) => {
    if (iterable.length === 0) {
      res(new AggregateError([]));
      return;
    }
    const errors: any = [];
    let errosCount = 0;
    iterable.map((p, idx) => {
      Promise.resolve(p)
        .then((d) => res(d))
        .catch((e) => {
          errors[idx] = e;
          errosCount++;
          if (errosCount === iterable.length) {
            rej(new AggregateError(errors));
          }
        });
    });
  });
}
