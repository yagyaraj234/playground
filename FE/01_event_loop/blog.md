**JavaScript's Event Loop: The Mental Model Every Developer Actually Needs**

hey 👋 developers! if you've ever wondered why `Promise.then()` runs before `setTimeout`, or why your async code sometimes behaves in ways that feel almost random — this article is for you.

the event loop is one of those topics that looks simple until you actually need to explain it. let's fix that.

**table of contents**

1. what is the event loop, really?
2. the call stack
3. microtasks vs macrotasks (this is the one that trips everyone up)
4. why Promise callbacks run before setTimeout
5. event loop starvation — and why you should care
6. putting it all together

---

**what is the event loop, really?**

JavaScript is single-threaded. one line runs at a time. but your browser can do 10 things at once — fetch data, run timers, handle clicks. how?

the event loop is the answer. it's the coordination layer between your JS code and the browser's APIs. it watches two things: the call stack and the task queues. when the stack is empty, it picks the next thing to run.

that "pick the next thing" part? that's where it gets interesting.

---

**the call stack**

every function call goes onto the stack. every return pops it off. synchronous code runs top to bottom, and nothing else runs until the stack is empty.

```js
function greet() {
  console.log("hello");
}

function main() {
  greet();
  console.log("world");
}

main();
// hello
// world
```

no surprises here. but the moment you introduce async — that's when the event loop takes over.

---

**microtasks vs macrotasks**

this is the part that clicks everything else into place.

the browser maintains two separate queues. not one — two. and they have different priorities.

**macrotask queue** (also called the task queue):

- `setTimeout`
- `setInterval`
- I/O callbacks
- UI rendering events

**microtask queue**:

- `Promise.then`, `Promise.catch`, `Promise.finally`
- `queueMicrotask()`
- `MutationObserver` callbacks

the rule is simple but has big consequences: **after every macrotask, the engine drains the entire microtask queue before picking the next macrotask.**

```js
console.log("1 — sync");

setTimeout(() => console.log("2 — macrotask"), 0);

Promise.resolve().then(() => console.log("3 — microtask"));

console.log("4 — sync");

// output:
// 1 — sync
// 4 — sync
// 3 — microtask
// 2 — macrotask
```

sync runs first (call stack). then microtasks. then macrotasks. `setTimeout(0)` doesn't mean "run immediately" — it means "put this in the macrotask queue."

---

**why Promise callbacks run before setTimeout**

now it's obvious, right?

`Promise.then` goes to the microtask queue. `setTimeout` goes to the macrotask queue. microtasks always get processed before the next macrotask is picked up.

even `setTimeout(fn, 0)` has to wait for all pending microtasks to finish first.

this is why chaining `.then()` calls feels "immediate" even though they're async — they're all draining from the microtask queue without the event loop having to take another full cycle.

---

**event loop starvation**

here's the part most articles skip.

if you keep adding microtasks from within microtasks, the macrotask queue never gets a turn. the event loop just keeps draining microtasks forever. this is called starvation.

```js
function infiniteMicrotasks() {
  Promise.resolve().then(infiniteMicrotasks);
}

infiniteMicrotasks();
// UI is now frozen. setTimeout will never run.
```

in practice, you'd hit this if you have a recursive Promise chain processing a huge dataset without yielding. the UI freezes because rendering is a macrotask — and it never gets a chance to run.

the fix: use `setTimeout` or `scheduler.postTask()` to intentionally yield back to the macrotask queue so the browser can breathe.

---

**putting it all together**

here's the mental model to carry with you:

1. run all sync code (call stack)
2. drain the entire microtask queue
3. run one macrotask
4. drain the microtask queue again
5. repeat

every tick of the event loop follows this order. once you internalize this, async JavaScript becomes predictable.

---

So in simple language all microtask will execute first then 




