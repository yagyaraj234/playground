const ComputeAmount = function compute() {
  return {
    total: 0,
    lacs: function (num: number) {
      this.total += num * 100000;
      return this;
    },
    crore: function (num: number) {
      this.total += num * 10000000;
      return this;
    },
    thousand: function (num: number) {
      this.total += num * 1000;
      return this;
    },
    value: function () {
      return this.total;
    },
  };
};

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

// MEthod 2

const Compute = function comp() {
  this.total = 0;

  ((this.lacs = function (num: number) {
    this.total += num * 100000;
    return this;
  }),
    (this.crore = function (num: number) {
      this.total += num * 10000000;
      return this;
    }),
    (this.thousand = function (num: number) {
      this.total += num * 1000;
      return this;
    }),
    (this.value = function () {
      return this.total;
    }));
};

const comp = new Compute();
const total = comp
  .lacs(15)
  .crore(5)
  .crore(2)
  .lacs(20)
  .thousand(45)
  .crore(7)
  .value();
console.log(total === 143545000, total);
