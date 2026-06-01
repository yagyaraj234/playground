function flattenA(arr: any[], ans: any[]) {
  const len = arr.length;
  if (len === 0) return;

  for (let i = 0; i < len; i++) {
    if (Array.isArray(arr[i])) {
      flatten(arr[i], ans);
    } else {
      ans.push(arr[i]);
    }
  }
}

let arr = [
  [[[[[[1, 2], 3]], 4, 5]]],
  6,
  7,
  [
    [
      [
        [
          [
            [
              [
                [
                  [
                    8,
                    [
                      [
                        [
                          [
                            9,
                            [
                              [
                                [10],
                                11,
                                [[[[[[[[[[[[[[[[[[[12, 15]]]]]]]]]]]]]]]]]]],
                              ],
                            ],
                          ],
                        ],
                      ],
                    ],
                  ],
                ],
              ],
            ],
          ],
        ],
      ],
    ],
  ],
];
let ans: any[] = [];
flattenA(arr, ans);

// with proptypes
function flatten() {
  const res: any[] = [];

  function process(arr: any[]) {
    for (let i = 0; i < arr.length; i++) {
      const curr = arr[i];
      if (Array.isArray(curr)) {
        process(curr);
      } else {
        res.push(curr);
      }
    }
  }
  process(this);
  return res;
}

Array.prototype.flatten = flatten;

console.log(ans);
