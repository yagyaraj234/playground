class LFUCache {
  freq = new Map();
  mp = new Map();
  capacity = 10;

  constructor(capacity) {
    this.capacity = capacity;
  }

  _updateFre(key, freq) {
    const currentFre = this.freq.get(freq);
    if (currentFre) {
      const newSet = new Set([...currentFre, key]);
      this.freq.set(freq, newSet);

      //  remove from old bucket
      if (freq > 1) {
        this.freq.get(freq - 1).delete(key);
      }
    } else {
      this.freq.set(freq, new Set([key]));
    }
    const oldFre = this.freq.get(freq - 1);
    if (oldFre && oldFre?.size === 0) {
      this.freq.delete(freq - 1);
    }
  }

  _remove() {
    // check les freq;
    let it = 1;
    while (it < this.freq.size) {
      const item = this.freq.get(it);
      if (item && item.size > 0) {
        const key = item.values().next().value;
        item.delete(key);
        this.mp.delete(key);
        if (item.size === 0) this.freq.delete(it); // clean up empty bucket
        break; //
      }
      it++;
    }
  }

  put(key, value) {
    if (this.capacity <= 0) return;

    if (this.mp.has(key)) {
      const current = this.mp.get(key);
      const freq = current.freq + 1;
      this.mp.set(key, {
        value,
        freq,
      });
      this._updateFre(key, freq);
      return;
    } else if (this.capacity !== this.mp.size) {
      this.mp.set(key, {
        value,
        freq: 1,
      });
      this._updateFre(key, 1);
    } else {
      //  capacity is full remove less freq used;
      this._remove();

      if (this.mp.size !== this.capacity) {
        this.mp.set(key, {
          value,
          freq: 1,
        });
        this._updateFre(key, 1);
      }
    }
  }

  get(key) {
    if (this.mp.has(key)) {
      const value = this.mp.get(key);

      //  update freq table;
      this._updateFre(key, value.freq + 1);
      return value.value;
    }
    return -1;
  }
  getAllKeys() {
    return this.mp;
  }
}

const cache = new LFUCache(3);

cache.put("a", 1); // a: freq 1
cache.put("b", 2); // b: freq 1
cache.put("c", 3); // c: freq 1

cache.get("a"); // a: freq 2
cache.get("a"); // a: freq 3
cache.get("b"); // b: freq 2

// freqMap: { 1: [c], 2: [b], 3: [a] }
// minFreq: 1
console.log("before: ", cache.getAllKeys());

cache.put("d", 4); // cache full, evict c (freq 1, only one there)
// minFreq resets to 1 for new key d

console.log("after: ", cache.getAllKeys());
