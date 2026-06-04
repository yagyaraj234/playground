class AnalyticsSDK<T> {
  queuedItem: T[] = [];
  count = 1;

  logEvent(event: T) {
    this.queuedItem.push(event);
  }
  wait() {
    return new Promise((res, rej) => {
      setTimeout(() => {
        if (this.count % 5 === 0) {
          rej(false);
        }
        res(true);
      }, 1000);
    });
  }
  async sendEvent() {
    if (this.queuedItem.length === 0) {
      return;
    }

    const current = this.queuedItem.shift();

    try {
      await this.wait();

      console.log(`Analytics sent   ${current}`);
      this.count++;
    } catch (error) {
      // if execution fails
      console.log("-----------------------");
      console.log("Failed to send " + current);
      console.log("Retrying sending " + current);
      console.log("-----------------------");

      this.count = 1;
    } finally {
      this.sendEvent();
    }
  }

  async send() {
    await this.sendEvent();
  }
}

const sdkInstance = new AnalyticsSDK();

sdkInstance.logEvent("event 1");
sdkInstance.logEvent("event 2");
sdkInstance.logEvent("event 3");
sdkInstance.logEvent("event 4");
sdkInstance.logEvent("event 5");
sdkInstance.logEvent("event 6");
sdkInstance.logEvent("event 7");
sdkInstance.logEvent("event 8");
sdkInstance.logEvent("event 9");
sdkInstance.logEvent("event 10");

sdkInstance.send();
