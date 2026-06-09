// import { print } from "./mru-cache-eviction";

interface Value<T> {
  value: T;
  expireAt: number;
}

class TTLCache<T> {
  map: Map<string, Value<T>> = new Map();
  constructor() {
    this.map = new Map();
  }

  get(key: string) {
    const item = this.map.get(key);
    if (!item) return -1;
    if (item?.expireAt < Date.now()) {
      this.map.delete(key);
      return -1;
    }
    return item?.value;
  }

  set(key: string, value: T, ttl: number) {
    const val = {
      value,
      expireAt: Date.now() + ttl,
    };

    this.map.set(key, val);
  }
}

const ttlCache = new TTLCache();

ttlCache.set("user:name", "Yagyaraj Lodhi", 2000);
ttlCache.set("user:email", "hey@yagyaraj.com", 2000);
ttlCache.set("user:username", "yagyaraj234", 2000);

setTimeout(() => {
  console.log(ttlCache.get("user:name"));
}, 3000);
// print(ttlCache.get("user:username"));
// print(ttlCache.get("user:email"));
