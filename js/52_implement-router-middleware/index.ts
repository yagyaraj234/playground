class Router {
  routes = new Map();

  addRoute(path: string, component: any) {
    this.routes.set(path, component);
  }

  callRoute(path: string) {
    const item = this.routes.get(path);
    if (!item) {
      const keys = this.routes.keys();
      for (let key of keys) {
        if (this.wildcardMatch(path, key)) {
          return this.routes.get(key);
        }
      }
    }

    return item;
  }

  wildcardMatch(text: string, pattern: string) {
    const regexPattern = new RegExp(
      "^" + pattern.replace(/\?/g, ".").replace(/\*/g, ".*") + "$",
    );
    return regexPattern.test(text);
  }
}

const router = new Router();

router.addRoute("hey", "i'm");

router.addRoute("/foo/baz", "foo");
router.addRoute("/foo/*", "dyanmic foo");

console.log(router.callRoute("hey"));

console.log(router.callRoute("/foo/baz"));
console.log("param abc", router.callRoute("/foo/abc"));

// Dynamic path
router.addRoute("/foo", "foo");
router.addRoute("/bar/*/baz", "dynamic baz");

console.log(router.callRoute("/bar/a/baz"));
