function solve(fn: Function, it: number) {
  let count = 1;
  return (callid: number) => {
    if (count === it) {
      fn(callid);
      count = 1;
    } else {
      count++;
    }
  };
}

function log(callid: number) {
  console.log("logging", callid);
}

const logger = solve(log, 2);

logger(1);
logger(2);
logger(3);
logger(4);
logger(5);
logger(6);
