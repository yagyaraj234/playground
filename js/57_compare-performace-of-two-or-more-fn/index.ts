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
  const avg = (sum / config.iterations).toFixed(1);
  console.log("Average: ", avg, " ms");
  console.log("Min: ", min.toFixed(1));
  console.log("Max: ", max.toFixed(1));

  console.log("----------------------------------------");

  return {
    min: min.toFixed(2),
    max: max.toFixed(2),
    avg,
  };
}

async function comparePerformance(
  fn: Record<string, any>[],
  config: Record<string, any>,
) {
  const results = [];

  for (let it = 0; it < fn.length; it++) {
    const curr = fn[it];
    const res = await measurePerformance(curr.fn, {
      ...config,
      name: curr.name,
    });

    results.push({
      name: curr.name,
      ...res,
      it: it + 1,
    });
  }

  console.log(
    "Performance Comparison\n ",
    "----------------------------------------",
  );
  for (let i = 0; i < results.length; i++) {
    const curr = results[i];
    console.log(curr.it, ". ", curr.name);
    console.log("Average: ", curr.avg);
    console.log("Min: ", curr.min);
    console.log("Max: ", curr.max);
  }
}

// async function
// Input:
const asyncFunction2 = async () => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return "done";
};

// normal function
const syncFunction2 = () => {
  let sum = 0;
  for (let i = 0; i < 1000000; i++) {
    sum += i;
  }
  return sum;
};

// compare two functions
comparePerformance(
  [
    { fn: syncFunction2, name: "Sync Calculation" },
    { fn: asyncFunction2, name: "Async Operation" },
  ],
  {
    iterations: 5,
    warmup: true,
  },
);
