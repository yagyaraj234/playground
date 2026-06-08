class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();

    // Two dummy nodes so you never deal with null edge cases
    this.head = new Node(0, 0); // most recent end
    this.tail = new Node(0, 0); // least recent end
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  // Remove a node from its current position in the list
  _remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  // Insert a node right after head (most recently used position)
  _insertAtHead(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
  }

  get(key) {
    if (!this.map.has(key)) return -1;

    const node = this.map.get(key);
    this._remove(node); // pull it out of current position
    this._insertAtHead(node); // mark it as most recently used
    return node.value;
  }

  put(key, value) {
    if (this.map.has(key)) {
      const node = this.map.get(key);
      node.value = value;
      this._remove(node);
      this._insertAtHead(node);
      return;
    }

    if (this.map.size === this.capacity) {
      const lru = this.tail.prev; // least recently used node
      this._remove(lru);
      this.map.delete(lru.key); // this is why Node stores key
    }

    const newNode = new Node(key, value);
    this._insertAtHead(newNode);
    this.map.set(key, newNode);
  }
}

const cache = new LRUCache(3);

cache.put("a", 1);
cache.put("b", 2);
cache.put("c", 3);
// list: a <- b <- c (c is LRU)

cache.get("a");
// list: b <- c <- a (a moved to front, c is now LRU)

cache.put("d", 4);
// cache full, c gets evicted
// list: b <- a <- d
