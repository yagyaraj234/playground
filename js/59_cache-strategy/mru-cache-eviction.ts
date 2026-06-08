function print(res: any) {
  console.log(res);
}

class CacheNode {
  key: string = "";
  value: any = "";
  next: any;
  prev: any;
  constructor(key: any, value: any) {
    this.key = key;
    this.value = value;
  }
}

class MRUCache {
  capacity: number = 0;
  map = new Map();
  head: any;
  tail: any;

  constructor(capacity: number) {
    this.capacity = capacity;

    this.head = new CacheNode(0, 0);
    this.tail = new CacheNode(0, 0);

    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  _remove(node?: any) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  _insertAtFront(node: any) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next = node;
    node.next.prev = node;
    this.map.set(node.key, node);
  }

  put(key: string, value: any) {
    if (this.map.has(key)) {
      this._remove(this.map.get(key));
      this.map.delete(key);
    } else if (this.map.size === this.capacity) {
      const mru = this.head.next;
      this._remove(mru);
      this.map.delete(mru.key);
    }
    const node = new CacheNode(key, value);
    this._insertAtFront(node);
  }
  get(key: string) {
    if (!this.map.has(key)) return -1;
    const node = this.map.get(key);
    this._remove(node);
    this._insertAtFront(node);
    return node.value;
  }
}

const cache = new MRUCache(2);

cache.put("user:name", "Yagyaraj Lodhi");
cache.put("user:email", "hey@yagyaraj.com");
cache.put("user:username", "yagyaraj234");

print(cache.get("user:name"));
print(cache.get("user:username"));
print(cache.get("user:email"));
