---

## what are the 4 rules of `this` binding?

`this` is one of those things that bites every JS developer at some point. the rule seems simple until your callback breaks at runtime and you spend 20 minutes debugging a value that was supposed to be obvious.

here's the thing — `this` isn't fixed. it's determined at _call time_, not at definition time (except for arrow functions, but we'll get there). JavaScript uses 4 rules to figure out what `this` points to, and they apply in a specific priority order.

**table of contents**

1. default binding
2. implicit binding
3. new binding
4. how arrow functions differ
5. follow-up questions

---

### 1. what is default binding?

when a function is called standalone — no object, no `new`, no `.call()` — JavaScript falls back to default binding.

in non-strict mode, `this` defaults to the global object (`window` in browsers, `global` in Node.js). in strict mode, it's `undefined`.

```js
function greet() {
  console.log(this); // window (or undefined in strict mode)
}

greet();
```

this is the "fallback" rule. if none of the other 3 rules apply, you're getting default binding.

---

### 2. what is implicit binding?

when a function is called as a method on an object, `this` gets implicitly bound to that object — the one sitting to the left of the dot at call time.

```js
const user = {
  name: "Arjun",
  greet() {
    console.log(this.name); // "Arjun"
  },
};

user.greet();
```

the key phrase is _at call time_. if you pull that method out of the object and call it separately, you lose the binding — this is the infamous "lost `this`" problem that trips up most developers early on.

```js
const fn = user.greet;
fn(); // undefined — default binding kicks in now
```

---

### 3. what is new binding?

when you call a function with `new`, JavaScript does 4 things automatically: creates a fresh object, sets `this` to that object, runs the function body, and returns `this` (unless you explicitly return something else).

```js
function User(name) {
  this.name = name; // "this" = the new object being created
}

const u = new User("Priya");
console.log(u.name); // "Priya"
```

`new` binding beats both default and implicit binding. it's the most explicit way to control what `this` points to when constructing objects.

---

### 4. how do arrow functions differ?

arrow functions don't have their own `this` at all. they capture `this` from the surrounding lexical scope — wherever the arrow function was _defined_, not where it's called.

```js
const user = {
  name: "Ravi",
  greet() {
    const inner = () => {
      console.log(this.name); // "Ravi" — captured from greet()
    };
    inner();
  },
};

user.greet();
```

this is why arrow functions are the go-to fix for the "lost `this`" problem in callbacks. they don't participate in the 4-rule system — the binding is locked at definition time.

---

### priority order (when rules conflict)

`new` → explicit (`.call`, `.apply`, `.bind`) → implicit → default

---

## follow-up questions

**4-5. what is explicit binding?**
`.call()`, `.apply()`, and `.bind()` let you manually set `this` to any object you want — no matter how the function is called. this is the missing 5th concept that completes the picture.

**4-6. what does `.bind()` return and when would you use it?**
`.bind()` doesn't call the function — it returns a _new_ function with `this` permanently locked in. useful for event handlers and passing methods as callbacks.

**4-7. what happens to `this` inside a `setTimeout` callback?**
classic gotcha. the callback runs in default binding context, so `this` is `window` (or `undefined` in strict mode) — unless you use an arrow function or `.bind()`.

**4-8. can you use `new` with an arrow function?**
nope — arrow functions can't be constructors. calling `new` on one throws a `TypeError`. understanding _why_ reinforces why arrow functions have no `this`.

**4-9. what is the priority order when multiple rules apply?**
`new` > explicit > implicit > default. knowing the order lets you predict `this` in any situation without guessing.

**4-10. how does `this` behave inside a class method vs a plain object method?**
class methods use strict mode by default, which changes the default binding fallback. worth understanding before you mix class syntax with callbacks.

---

happy coding!
