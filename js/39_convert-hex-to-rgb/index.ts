type RGB = {
  r: number;
  g: number;
  b: number;
};

function convertHexToRGB(hex: string): RGB {
  let input = hex.replace("#", "");

  if (input.length === 3) {
    input = input[0] + input[0] + input[1] + input[1] + input[2] + input[2];
  }

  let r = parseInt(input.slice(0, 2), 16);
  let g = parseInt(input.slice(2, 4), 16);
  let b = parseInt(input.slice(4, 6), 16);

  return {
    r,
    g,
    b,
  };
}

console.log(convertHexToRGB("#fff"));
