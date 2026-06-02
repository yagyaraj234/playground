Array.prototype.myMap = function (callback, thisArg) {
  if (this == null) {
    throw new TypeError("Cannot read properties of null or undefined");
  }

  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  const result = new Array(this.length);

  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      result[i] = callback.call(thisArg, this[i], i, this);
    }
  }

  return result;
};

const arr = [1, 2, 4, 4, 65];

const res = arr.myMap((item) => item * 2);

console.log(res);
