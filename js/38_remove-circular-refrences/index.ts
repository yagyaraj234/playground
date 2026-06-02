function removeCircularObj(obj: Record<string, any>) {
  let visited = new Set();

  function traverse(currentObj: any) {
    if (currentObj && typeof currentObj === "object") {
      visited.add(currentObj);
      Object.keys(currentObj).forEach((key) => {
        const val = currentObj[key];

        if (val && typeof val === "object") {
          if (visited.has(val)) {
            delete currentObj[key];
          } else {
            traverse(val);
          }
        }
      });
    }
  }

  traverse(obj);
}

let a: Record<string, any> = {
  a: "b",
  c: "d",
};

let b = {
  name: "raj",
  email: "hey@yagyaraj.com",
};

let c = {
  profile: "developer",
};

a["b"] = b;
a["b"]["user"] = b;
a["b"]["profile"] = c;
a["c"] = a;
a["c"]["a"] = c;

console.log(a);

console.log("removing start \n ", removeCircularObj(a), "end \n");
console.log(a);
JSON.stringify(a);
