// Method chaining - Part 1
// Explain method chaining in JavaScript by implementing a calculator that performs the basic actions like add, subtract, divide, and multiply.

// Example
// calculator.add(10).subtract(2).divide(2).multiply(5);
// console.log(calculator.total);
// //20

class Calculator {
  value = 0;
  add(num: number) {
    this.value += num;
    return this;
  }
  subtract(num: number) {
    this.value -= num;
    return this;
  }
  multiply(num: number) {
    this.value *= num;
    return this;
  }
  print() {
    console.log(this.value);
  }
}

const cal = new Calculator();

cal.add(50).subtract(10)?.multiply(5).print();
