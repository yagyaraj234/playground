console.log("hello");

setTimeout(() => {
  console.log("inside setTimeout");
});

Promise.resolve().then(() => {
  console.log("inside promise");
});

console.log("end");
