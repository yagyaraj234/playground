async function measurePerformance(fn: Function, config: Record<string, any>) {
  if (config.warmup) {
    await fn();
  }
  let sum = 0;
  let min = 10000000;
  let max = 0;
  console.log(
    `Performance Results for ${config.name} \n`,
    "----------------------------------------",
  );

  for (let i = 0; i < config.iterations; i++) {
    const start = performance.now();
    await fn();
    const end = performance.now();
    const time: any = end - start;
    sum += time;
    if (min > time) {
      min = time;
    }
    if (max < time) {
      max = time;
    }
  }
  console.log("Average: ", (sum / config.iterations).toFixed(1));
  console.log("Min: ", min.toFixed(1));
  console.log("Max: ", max.toFixed(1));

  console.log("----------------------------------------");
}

const syncFunction = () => {
  let sum = 0;
  for (let i = 0; i < 1000000; i++) {
    sum += i;
  }
  return sum;
};

measurePerformance(syncFunction, {
  name: "Sync Calculation",
  iterations: 5,
  warmup: true,
});

// async function
const asyncFunction = async () => {
  await new Promise((resolve, reject) => setTimeout(resolve, 100));
  return "done";
};

// measure performance of the async function
measurePerformance(asyncFunction, {
  name: "Async Calculation",
  iterations: 5,
  warmup: true,
});

// Output: "Performance Results for Sync Calculation:";
// ("----------------------------------------");
// ("Type: Sync");
// ("Iterations: 5");
// ("Average: 10.00ms");
// ("Min: 9.00ms");
// ("Max: 11.00ms");
// ("----------------------------------------");
