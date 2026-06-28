class RateLimitter {
  duration: number = 60;
  limit = 100;
  rate_freq: Record<string, any[]> = {};

  constructor(limit: number, duration: number) {
    this.duration = duration;
    this.limit = limit;
    this.rate_freq = {};
  }

  allowAccess(user_id: string, callback: Function) {
    const timestamp = performance.now();
    const windowMs = this.duration * 1000;

    const recentRequests = (this.rate_freq[user_id] || []).filter(
      (it) => timestamp - it < windowMs,
    );

    if (recentRequests.length < this.limit) {
      callback();
      this.rate_freq[user_id] = [...recentRequests, timestamp];
    }
  }
}

const Limitter = new RateLimitter(3, 30);

["user_1", "user_1", "user_1", "user_1"].forEach((item) => {
  Limitter.allowAccess(item, () => {
    console.log("hit for ", item);
  });
});
