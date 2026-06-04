class Analytics<T> {
  private queueItems: T[] = [];
  private retryItems: T[] = [];
  private count = 0;

  logEvent(log: T) {
    this.queueItems.push(log);
  }

  // ✅ FIX 4: Start retry loop in constructor
  constructor() {
    this.retry();
  }

  private send(event: T): boolean {
    if (this.count % 5 === 0) {
      console.log(`Failed to send ${JSON.stringify(event)}`);
      this.count++;
      return false;
    }
    console.log(`Analytics sent ${JSON.stringify(event)}`);
    this.count++;
    return true;
  }

  sendEvent(event: T, retry: boolean) {
    if (retry) {
      console.log(`Retrying sending ${JSON.stringify(event)}`);
    }

    const success = this.send(event);

    if (success) {
      // ✅ FIX 1: Actually reassign the array (filter returns new array, doesn't mutate)
      if (retry) {
        this.retryItems = this.retryItems.filter((i) => i !== event);
      } else {
        this.queueItems = this.queueItems.filter((i) => i !== event);
      }
    } else {
      // ✅ if it failed and it's not already a retry, move to retryItems
      if (!retry) {
        this.retryItems.push(event);
        this.queueItems = this.queueItems.filter((i) => i !== event);
      }
    }
  }

  // ✅ FIX 5: Flush — actually send queued items
  flush() {
    const itemsToSend = [...this.queueItems];
    itemsToSend.forEach((item) => this.sendEvent(item, false));
  }

  private retry() {
    setInterval(() => {
      if (this.retryItems.length > 0) {
        // ✅ FIX 2: snapshot before iterating so mutations mid-loop don't cause issues
        const itemsToRetry = [...this.retryItems];
        itemsToRetry.forEach((item) => {
          // ✅ FIX 2: setTimeout fires once, setInterval fires forever
          setTimeout(() => {
            this.sendEvent(item, true);
          }, 1000);
        });
      }
    }, 5000);
  }
}

// ✅ FIX 3: Provide the type explicitly
const sdk = new Analytics<string>();

sdk.logEvent("event 1");
sdk.logEvent("event 2");
sdk.logEvent("event 3");
sdk.logEvent("event 4");
sdk.logEvent("event 5");
sdk.logEvent("event 6");
sdk.logEvent("event 7");
sdk.logEvent("event 8");
sdk.logEvent("event 9");
sdk.logEvent("event 10");

sdk.flush();
