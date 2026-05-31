export default function deepClone<T>(value: T): T {
  if (value === null || typeof value !== "object") return value;

  const seen = new WeakMap(); // ← tracks already-visited objects

  function traverse(value: any, result: any): any {
    if (typeof value === "function") {
      return value;
    }

    if (value instanceof Date) {
      return new Date(value.getTime());
    }

    if (value instanceof Map) {
      // ← check seen before processing
      if (seen.has(value)) return seen.get(value);
      const mapClone = new Map();
      seen.set(value, mapClone);
      value.forEach((val, key) => {
        mapClone.set(
          key,
          val !== null && typeof val === "object"
            ? traverse(val, Array.isArray(val) ? [] : {})
            : val,
        );
      });
      return mapClone;
    }

    if (value instanceof Set) {
      // ← check seen before processing
      if (seen.has(value)) return seen.get(value);
      const setClone = new Set();
      seen.set(value, setClone);
      value.forEach((val) => {
        setClone.add(
          val !== null && typeof val === "object"
            ? traverse(val, Array.isArray(val) ? [] : {})
            : val,
        );
      });
      return setClone;
    }

    if (Array.isArray(value)) {
      // ← check seen before processing
      if (seen.has(value)) return seen.get(value);
      const arrClone: any[] = [];
      seen.set(value, arrClone);
      value.forEach((item) => {
        arrClone.push(
          item !== null && typeof item === "object"
            ? traverse(item, Array.isArray(item) ? [] : {})
            : item,
        );
      });
      return arrClone;
    }

    if (typeof value === "object" && value !== null) {
      // ← check seen before processing
      if (seen.has(value)) return seen.get(value);
      seen.set(value, result);
      Object.keys(value).forEach((i) => {
        const curr = value[i];
        if (curr !== null && typeof curr === "object") {
          result[i] = traverse(curr, Array.isArray(curr) ? [] : {});
        } else {
          result[i] = curr;
        }
      });
    }

    return result;
  }

  return traverse(value, Array.isArray(value) ? [] : {});
}

const obj = { role: "foo" };
const clonedObj = deepClone(obj);

console.log("output ----> ", clonedObj, "\n");
clonedObj.role = "bar";
console.log(clonedObj);

const obj2 = { user: { role: "admin", id: "123" } };
const clonedObj2 = deepClone(obj2);
console.log("output ----> ", clonedObj2, "\n");
clonedObj2.user.role = "bar";
console.log(clonedObj2);

// ─── Test 1: Nested Object ───────────────────────────────────────────────────
const obj1 = { user: { role: "admin", id: "123" } };
const clonedObj1 = deepClone(obj1);
console.log("Before →", clonedObj1); // { user: { role: 'admin', id: '123' } }
clonedObj1.user.role = "guest";
console.log("After  →", clonedObj1); // { user: { role: 'guest', id: '123' } }
console.log("Original unchanged →", obj1); // { user: { role: 'admin', id: '123' } }

// ─── Test 2: Array of Objects ────────────────────────────────────────────────
// const obj2 = { items: [{ name: "apple" }, { name: "banana" }] };
// const clonedObj2 = deepClone(obj2);
// console.log("Before →", clonedObj2); // { items: [ { name: 'apple' }, { name: 'banana' } ] }
// clonedObj2.items[0].name = "mango";
// console.log("After  →", clonedObj2); // { items: [ { name: 'mango' }, { name: 'banana' } ] }
// console.log("Original unchanged →", obj2); // { items: [ { name: 'apple' }, { name: 'banana' } ] }

// ─── Test 3: Deeply Nested Object ────────────────────────────────────────────
const obj3 = { a: { b: { c: { d: 42 } } } };
const clonedObj3 = deepClone(obj3);
console.log("Before →", clonedObj3); // { a: { b: { c: { d: 42 } } } }
clonedObj3.a.b.c.d = 999;
console.log("After  →", clonedObj3); // { a: { b: { c: { d: 999 } } } }
console.log("Original unchanged →", obj3); // { a: { b: { c: { d: 42 } } } }

// ─── Test 4: Array of Primitives ─────────────────────────────────────────────
const obj4 = { scores: [10, 20, 30] };
const clonedObj4 = deepClone(obj4);
console.log("Before →", clonedObj4); // { scores: [ 10, 20, 30 ] }
clonedObj4.scores.push(99);
console.log("After  →", clonedObj4); // { scores: [ 10, 20, 30, 99 ] }
console.log("Original unchanged →", obj4); // { scores: [ 10, 20, 30 ] }

// ─── Test 5: Mixed Types (string, number, boolean, null) ─────────────────────
const obj5 = { name: "Alice", age: 30, active: true, nickname: null };
const clonedObj5 = deepClone(obj5);
console.log("Before →", clonedObj5); // { name: 'Alice', age: 30, active: true, nickname: null }
clonedObj5.name = "Bob";
clonedObj5.active = false;
console.log("After  →", clonedObj5); // { name: 'Bob', age: 30, active: false, nickname: null }
console.log("Original unchanged →", obj5); // { name: 'Alice', age: 30, active: true, nickname: null }

// ─── Test 6: Date Object ─────────────────────────────────────────────────────
const obj6 = { createdAt: new Date("2024-01-01") };
const clonedObj6 = deepClone(obj6);
console.log("Before →", clonedObj6); // { createdAt: 2024-01-01T00:00:00.000Z }
clonedObj6.createdAt.setFullYear(2099);
console.log("After  →", clonedObj6); // { createdAt: 2099-01-01T00:00:00.000Z }
console.log("Original unchanged →", obj6); // { createdAt: 2024-01-01T00:00:00.000Z }

// ─── Test 7: Object with Map ──────────────────────────────────────────────────
const obj7 = {
  lookup: new Map([
    ["key1", "value1"],
    ["key2", "value2"],
  ]),
};
const clonedObj7 = deepClone(obj7);
console.log("Before →", clonedObj7); // { lookup: Map(2) { 'key1' => 'value1', 'key2' => 'value2' } }
clonedObj7.lookup.set("key1", "UPDATED");
console.log("After  →", clonedObj7); // { lookup: Map(2) { 'key1' => 'UPDATED', 'key2' => 'value2' } }
console.log("Original unchanged →", obj7); // { lookup: Map(2) { 'key1' => 'value1', 'key2' => 'value2' } }

// ─── Test 8: Object with Set ──────────────────────────────────────────────────
const obj8 = { tags: new Set(["typescript", "nodejs", "react"]) };
const clonedObj8 = deepClone(obj8);
console.log("Before →", clonedObj8); // { tags: Set(3) { 'typescript', 'nodejs', 'react' } }
clonedObj8.tags.add("python");
console.log("After  →", clonedObj8); // { tags: Set(4) { 'typescript', 'nodejs', 'react', 'python' } }
console.log("Original unchanged →", obj8); // { tags: Set(3) { 'typescript', 'nodejs', 'react' } }

// ─── Test 9: Circular Reference ──────────────────────────────────────────────
const obj9: any = { name: "circular" };
obj9.self = obj9; // circular reference
const clonedObj9 = deepClone(obj9);
console.log("Before →", clonedObj9.name); // 'circular'
console.log("Circular ref preserved →", clonedObj9.self === clonedObj9); // true
clonedObj9.name = "updated";
console.log("After  →", clonedObj9.name); // 'updated'
console.log("Original unchanged →", obj9.name); // 'circular'
