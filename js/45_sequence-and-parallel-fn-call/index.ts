function wait(num: number) {
  return new Promise<number>((res) => setTimeout(() => res(num), num * 100));
}

async function A() {
  return wait(20);
}

async function B() {
  return wait(30);
}

//  parallel execution

async function parallelExec() {
  const call1 = A();
  const call2 = B();

  const res1 = await call1;
  const res2 = await call2;

  return res1 + res2;
}

//  sequence execution

async function sequenceExec() {
  const res1 = await A();
  const res2 = await B();

  return res1 + res2;
}

const evaluate = async (fn: Function, label: string) => {
  const startTime: any = performance.now();
  console.log(`Executing ${label} task starts...`);
  let result = await fn();
  const endTime: any = performance.now();
  console.log(
    `Task ${label} finished in ${Number.parseInt(endTime - startTime)} milliseconds with sum:`,
    result,
  );
};

evaluate(parallelExec, "parallel");
evaluate(sequenceExec, "sequence");
