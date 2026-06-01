function toggle(...args: string[]) {
  const items = args;
  let active = 0;
  return function () {
    console.log(items[active]);
    active++;
    if (!items[active]) {
      active = 0;
    }
  };
}
let hello = toggle("hello");
hello(); // "hello";
hello(); // "hello";

let onOff = toggle("on", "off", "pause");
onOff(); // "on"
onOff(); // "off"
onOff(); // "on"
