export default function promisify<T>(
  func: (...args: any[]) => void,
): (this: any, ...args: any[]) => Promise<T> {
  return function (this: any, ...args: any[]) {
    return new Promise((res, rej) => {
      func.call(this, ...args, (err: Error, val: any) => {
        if (err) {
          rej(err);
        }
        res(val);
      });
    });
  };
}
