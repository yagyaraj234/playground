class Timeout {
  timeoutIds = [];

  settimeout(callback, ms) {
    const id = setTimeout(() => {
      callback();
      this.timeoutIds = this.timeoutIds.filter((timeoutId) => timeoutId !== id);
    }, ms);
    this.timeoutIds.push(id);
  }
  clearalltimeout() {
    while (this.timeoutIds.length) {
      clearTimeout(this.timeoutIds.pop());
    }
  }
}

const timer = new Timeout();

function logger() {
  console.log("logging");
}

timer.settimeout(logger, 1000);
timer.settimeout(logger, 2000);
timer.settimeout(logger, 3000);
timer.settimeout(logger, 4000);
timer.clearalltimeout();
timer.settimeout(logger, 2000);
timer.settimeout(logger, 2000);
timer.settimeout(logger, 3000);
