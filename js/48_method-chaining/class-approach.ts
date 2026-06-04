class ComputeAmount {
  constructor() {
    this.total = 0;
  }
  lacs(num: number) {
    this.total += num * 100000;
    return this;
  }
  crore(num: number) {
    this.total += num * 10000000;
    return this;
  }
  thousand(num: number) {
    this.total += num * 1000;
    return this;
  }
  value() {
    return this.total;
  }
}

const computeAmount = new ComputeAmount();
const amount = computeAmount
  .lacs(15)
  .crore(5)
  .crore(2)
  .lacs(20)
  .thousand(45)
  .crore(7)
  .value();
console.log(amount === 143545000, amount);
