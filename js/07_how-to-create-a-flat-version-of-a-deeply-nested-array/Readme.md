Problem Statement
You are given a deeply nested array containing numbers and other nested arrays of arbitrary depth. Implement a method called flatten on the Array prototype that returns a new array with all values flattened into a single-level array.

The method must work for existing arrays as well as any arrays created in the future.

Requirements
It must not modify the original array.
It must handle arrays nested to any depth.
It should return a new flattened array.
Do not use existing built-in methods to flat the array.
Function Signature
Array.prototype.flatten = function() {
// your implementation
};
Arguments
None.
Returns:
A new array containing all elements flattened into a single level.
Examples
var input = [
1, 2, 3,
[4],
[5, 6, [7], [8, [9, [10]]]],
11, 12, 13,
[14, [[[[[15, [16]]]]]]],
17, 18,
[19, [20, [21, [22, [23, [24, [[[[[25]]]]]]]]]]]
];

var flatArray = input.flatten();

// Expected output:
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
