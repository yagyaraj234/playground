/**
 * Do not change the class name
 **/

class Emitter {
  // write your code here
  map: Record<string, Function[]> = {};

  subscribe(name: string, callback: Function) {
    if (!this.map[name]) {
      this.map[name] = [];
    }
    this.map[name].push(callback);
    return {
      release: () => {
        this.map[name] = this.map[name].filter((cb) => cb !== callback);

        if (this.map[name].length === 0) {
          delete this.map[name];
          console.log("unsubscribing to ", name);
        }
      },
    };
  }
  emit(name: string, ...args: any[]) {
    this.map[name].forEach((fn: Function) => {
      if (typeof fn == "function") {
        fn(...args);
      }
    });
  }

  release() {
    this.map = {};
  }
}

const em = new Emitter();

const sub1 = em.subscribe("abc", (...args: any) => {
  console.log("event received: ", "abc", ...args);
});

em.emit("abc", 1, 2, 3);
em.emit("abc", "hey");

sub1.release();
