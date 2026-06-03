class Iterator {
  items: any[] = [];
  current: number = 0;
  constructor(items: any[]) {
    this.items = items;
  }
  next() {
    return this.items[this.current++] ?? null;
  }
  done() {
    return this.items.length === this.current;
  }
  prev() {
    return this.items[--this.current];
  }
}

function helper(arr: any[]) {
  return new Iterator(arr);
}

const iterator = helper([1, 2, "hello"]);

console.log(iterator.next()); // 1
console.log(iterator.next()); // 2
console.log(iterator.done()); // false
console.log(iterator.next()); // "hello"
console.log(iterator.prev()); // 2
console.log(iterator.done()); // true
console.log(iterator.next()); // "null"
