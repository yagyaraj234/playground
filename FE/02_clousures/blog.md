**what are closures and how do they work? (javascript core, explained properly)**

---

hey 👋 developers! if you've ever stared at a javascript interview question about closures and thought _"i know what this does but i can't explain it"_ — this one's for you.

closures trip up a lot of devs because they feel magical. a function that remembers variables from a scope that's already finished executing? sounds weird. but once it clicks, you'll see them everywhere — in event handlers, in factories, in half the react hooks you write every day.

let's kill the confusion for good.

---

**table of contents**

1. what is a closure, actually?
2. do closures store values or references?
3. how closures cause memory leaks
4. what happens during garbage collection
5. common closure gotchas in interviews

---

## what is a closure, actually?

a closure is what happens when a function "closes over" variables from its outer scope — keeping them alive even after the outer function has returned.

```js
function makeCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

`makeCounter` is done. its execution context is gone. but `count` is still alive — because the inner function holds a reference to it. that's the closure.

---

## do closures store values or references?

this is sub question 2-1, and it's a trap.

closures store **references**, not values. they don't take a snapshot of the variable — they keep a live link to it. which means if the variable changes, the closure sees the change.

```js
function makeMultiplier(x) {
  return (y) => x * y;
}

const double = makeMultiplier(2);
console.log(double(5)); // 10
```

looks fine here. but the classic gotcha is the loop problem:

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
// prints: 3 3 3 — not 0 1 2
```

all three callbacks close over the **same** `i`. by the time they run, the loop is done and `i` is 3. swap `var` for `let` and each iteration gets its own `i`. problem solved.

---

## how closures cause memory leaks

closures are powerful, but they can hold memory hostage without you realizing it.

the pattern that bites devs most often: an event listener that closes over a large object, and the listener never gets cleaned up.

```js
function attachHandler() {
  const bigData = new Array(1000000).fill("🔥");

  document.getElementById("btn").addEventListener("click", () => {
    console.log(bigData[0]); // keeps bigData alive
  });
}
```

`bigData` can't be garbage collected as long as that click handler exists. if you call `attachHandler` multiple times without removing the old listener, you're stacking allocations.

the fix is always the same: remove event listeners when they're no longer needed.

```js
const handler = () => console.log(bigData[0]);
btn.addEventListener("click", handler);

// later...
btn.removeEventListener("click", handler);
```

now the closure drops its reference and the GC can clean up.

---

## what happens during garbage collection?

javascript's garbage collector uses **mark-and-sweep**. it starts from "roots" (global scope, call stack) and marks everything reachable. anything it can't reach gets swept — freed from memory.

closures survive GC because the inner function is still reachable — and it holds a reference to the outer variables. the GC sees that chain and keeps everything alive.

```
root → counter function → [[Closure]] → count variable
```

the moment nothing references `counter` anymore, the whole chain becomes unreachable. GC sweeps it.

this is why dangling event listeners are such a problem — the DOM node keeps the handler alive, the handler keeps the closure alive, the closure keeps the captured variables alive. nothing gets collected until the DOM node itself is removed.

---

## common closure gotchas in interviews

interviewers love to ask about closures in three flavors:

**1. the loop + var trap** (shown above — always reach for `let` or an IIFE)

**2. the stale closure in react**

```js
const [count, setCount] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    console.log(count); // always logs 0 — stale closure
  }, 1000);
  return () => clearInterval(interval);
}, []); // missing count in deps array
```

the effect closes over the initial `count`. adding `count` to the dependency array — or using a ref — fixes it.

**3. module pattern** — closures used intentionally to create private state:

```js
const counter = (() => {
  let _count = 0;
  return {
    increment: () => ++_count,
    value: () => _count,
  };
})();
```

`_count` is completely private. no outside code can touch it directly. that's closures being useful, not just tricky.

---

next up: **prototypes and the prototype chain**. if you've ever gotten a question like "how does `hasOwnProperty` actually work?" or wondered what's happening when you call a method that doesn't exist on an object — that's the article. follow me so you don't miss it.

happy coding! 🚀
