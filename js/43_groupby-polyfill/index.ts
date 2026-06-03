function groupBy(arr: any[], aggr: any) {
  return arr.reduce((acc, item, idx) => {
    let key = null;
    if (typeof aggr === "function") {
      key = aggr(item);
    } else {
      key = item[aggr];
    }
    if (!acc[key]) {
      acc[key] = [item];
    } else {
      acc[key] = [...(acc[key] || []), item];
    }
    return acc;
  }, {});
}

// Input:
console.log(groupBy([6.1, 4.2, 6.3], Math.floor));
console.log(groupBy(["one", "two", "three"], "length"));

// Output:
// { 6: [6.1, 6.3], 4: [4.2] }
// { 3: ['one', 'two'], 5: ['three'] }
