function checkIsArray(arr: any) {
  const check = Object.prototype.toString.call(arr);
  console.log(check);
  return Object.prototype.toString.call(arr) === "[object Array]";
}

function checkIsString(string: any) {
  const check = Object.prototype.toString.call(string);
  console.log(check);
  return check === "[object String]";
}

function checkIsNumber(num: any) {
  const check = Object.prototype.toString.call(num);
  console.log(check);
  return Object.prototype.toString.call(num) === "[object Number]";
}

function checkIsObject(num: any) {
  const check = Object.prototype.toString.call(num);
  console.log(check);
  return Object.prototype.toString.call(num) === "[object Object]";
}

console.log("ARRAY:");
console.log(checkIsArray([21, 2, 4]));
console.log(checkIsArray("[21, 2, 4]"), "\n");

console.log("NUMBER:");
console.log(checkIsNumber(2));
console.log(checkIsNumber("3"), "\n");

console.log("STRING:");
console.log(checkIsString(2));
console.log(checkIsString("3"), "\n");

console.log("OBJECT:");
console.log(checkIsObject({ a: "", b: "c" }));
console.log(checkIsObject([{ a: "" }]), "\n");

// for Implementing Prototypes use this inplace argument/parameter
