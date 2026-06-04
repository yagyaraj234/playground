class Events {
  events: Record<string, Record<string, any>> = {};
  subscribeOnceAsyncList: any = new Map();
  subscribe(nm: string, callback: Function, once: boolean = false) {
    let multitple = false;
    if (this.events[nm]) {
      multitple = true;
      this.events[nm] = {
        ...this.events[nm],
        fn: [...this.events[nm].fn, callback],
      };
    } else {
      this.events[nm] = {
        once,
        fn: [callback],
      };
    }

    return {
      remove: () => {
        if (multitple) {
          const event = this?.events?.[nm]?.fn;
          if (!event) return;
          const events = event.filter((item) => item !== callback);
          this.events[nm].fn = events;
        } else {
          delete this.events[nm];
        }
      },
    };
  }
  subscribeOnce(nm: string, cl: Function) {
    this.subscribe(nm, cl, true);
  }

  publish(nm: string, ...args: any[]) {
    const events = this.events[nm];
    if (!events) return;

    events.fn.forEach((callback: Function) => {
      callback(...args);
    });
    if (events.once) {
      delete events[nm];
    }
  }

  publishAll(...args: any[]) {
    const keys = Object.keys(this.events);
    if (!keys.length) return;

    keys.forEach((curr) => {
      const item = this.events[curr];
      if (item.fn.length <= 1) {
        item.fn[0](...args);
      }
    });
  }

  subscribeOnceAsync = async function (name:string) {
    return new Promise((resolve, reject) => {
      if (!this.subscribeOnceAsyncList.has(name)) {
        this.subscribeOnceAsyncList.set(name, [resolve]);
      } else {
        const exisitngCallbacks = this.subscribeOnceAsyncList.get(name);
        this.subscribeOnceAsyncList.set(name, [...exisitngCallbacks, resolve]);
      }
    });
  };
}

const events = new Events();

const newUserNewsSubscription = events.subscribe(
  "new-user",
  function (payload: string) {
    console.log(`Sending Q1 News to: ${payload}`);
  },
);
events.publish("new-user", "Jhon");
events.publish("new-user", "Raj");

const newUserNewsSubscription2 = events.subscribe(
  "new-user",
  function (payload: string) {
    console.log(`Sending Q2 News to: ${payload}`);
  },
);

const newSub = events.subscribe("updates", (name: string) => {
  console.log(`triggered ${name}`);
});

events.publish("new-user", "Two subs");

newUserNewsSubscription2.remove();

events.publish("new-user", "One is removed");

events.publishAll("FooBar");

const asyncSub = events.subscribeOnceAsync("new-updates").then((type) => {
  console.log("evetn received ", type);
});

setTimeout(() => {
  events.publish("new-updates", "jira");
}, 2000);
