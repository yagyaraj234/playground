Here's the article on prototypal inheritance, written in your style:

---

# prototypal inheritance in JavaScript — what's actually happening under the hood

hey 👋 if you've been writing JavaScript for a while, you've probably heard "prototypal inheritance" thrown around in interviews or docs. but most explanations jump straight to the syntax without telling you _why_ the whole thing exists.

let's fix that.

---

**table of contents**

1. what is prototypal inheritance
2. `[[Prototype]]` vs `.prototype` — they're not the same thing
3. how the prototype chain actually works
4. `Object.create` and when to reach for it
5. follow-up questions to test yourself

---

## what is prototypal inheritance

in classical OOP languages like Java, you define a class and objects are instances of it. JavaScript doesn't work that way internally. every object in JS has a hidden link to another object — its prototype. when you try to access a property and JS can't find it on the object itself, it walks up that chain.

that's it. that's prototypal inheritance.

it's not copying properties. it's _delegating_ the lookup to another object.

---

## `[[Prototype]]` vs `.prototype` — they're not the same thing

this is the one that trips people up the most.

`[[Prototype]]` is the internal hidden link every object has. you can't access it directly with that syntax. JS uses double brackets to signal "this is an internal slot, not a property."

`.prototype` is a regular property that only exists on **functions**. when you call a function with `new`, JS sets the new object's `[[Prototype]]` to that function's `.prototype` object.

```js
function User(name) {
  this.name = name;
}

const raj = new User("Raj");

console.log(raj.__proto__ === User.prototype); // true
console.log(Object.getPrototypeOf(raj) === User.prototype); // true
```

`__proto__` is the old way to access `[[Prototype]]`. `Object.getPrototypeOf()` is the modern, safe way. use that.

so to be precise — `.prototype` is where you _define_ shared methods. `[[Prototype]]` is the _link_ the object actually follows at runtime.

---

## how the prototype chain works

every property lookup in JS follows this flow: check the object itself → if not found, go to `[[Prototype]]` → repeat until `null`.

```js
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function () {
  return `${this.name} makes a sound`;
};

function Dog(name) {
  Animal.call(this, name); // borrow Animal's constructor
}

Dog.prototype = Object.create(Animal.prototype); // set up the chain
Dog.prototype.constructor = Dog; // fix the constructor reference

Dog.prototype.bark = function () {
  return `${this.name} barks`;
};

const dog = new Dog("Bruno");

console.log(dog.bark()); // Bruno barks
console.log(dog.speak()); // Bruno makes a sound — found on Animal.prototype
```

when you call `dog.speak()`, JS first checks the `dog` object — not there. then it checks `Dog.prototype` — not there. then it checks `Animal.prototype` — found it.

that chain lookup is happening on every property access you write, whether you think about it or not.

---

## `Object.create` and when to reach for it

`Object.create(proto)` creates a brand new object whose `[[Prototype]]` is set to whatever you pass in. no constructor call, no `new` keyword.

```js
const animal = {
  speak() {
    return `${this.name} makes a sound`;
  },
};

const dog = Object.create(animal);
dog.name = "Bruno";

console.log(dog.speak()); // Bruno makes a sound
```

why use this over `new`? when you want inheritance without the ceremony of constructor functions. it's also the cleanest way to explicitly set the prototype chain when you're wiring things manually — like we did with `Dog.prototype = Object.create(Animal.prototype)` above.

in modern code you'll mostly use ES6 `class` syntax, but `class` is syntactic sugar over this exact mechanism. knowing `Object.create` means you understand what `class extends` is _actually doing_.

---

## follow-up questions to test yourself

**1. what does `Object.getPrototypeOf(raj)` return if `raj` is created with `new User()`?**
hint: think about where `new` puts the `[[Prototype]]` link.

**2. what happens if you do `Dog.prototype = Animal.prototype` instead of `Object.create(Animal.prototype)`?**
why is this a problem? what breaks when you add a method to `Dog.prototype`?

**3. if a property exists both on the object and its prototype, which one does JS use?**
what's the term for this behavior?

**4. what is the top of every prototype chain in JavaScript?**
what does `Object.prototype.__proto__` return, and why?

**5. ES6 `class` uses `extends` for inheritance. under the hood, what prototype mechanism does it map to?**
write the equivalent pre-ES6 code for a simple `class Dog extends Animal`.

---

next up: **closures and the scope chain** — same interview tier, but this is the one where most devs realize they've been guessing for years. follow me on Medium so you don't miss it.

happy coding!
