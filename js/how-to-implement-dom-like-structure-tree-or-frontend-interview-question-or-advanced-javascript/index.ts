class node {
  name = "";
  innerHtml = "";
  children: any[] = [];
  attr: any[] = [];
  constructor(name: string) {
    this.name = name;
    this.innerHtml = "";
  }
  appendChild(node: any) {
    this.children.push(node);
  }

  addAttribute(name, value) {
    this.attr.push({ name, value });
  }
  removeAttribute(name) {
    this.attr.filter((i) => i.name !== name);
  }
}

class vDocument extends node {
  createElement(nodeName: string) {
    return new node(nodeName);
  }
  getElementById() {}

  render() {
    function printSpaces(level) {
      const spaces = level * 4;
      for (let i = 0; i < spaces; i++) {
        process.stdout.write(" ");
      }
    }
    function printTree(node, level) {
      printSpaces(level);
      console.log(
        `<${node.name} ${node.attr.map((i) => `${i.name}="${i.value}"`).join(" ")} >`,
      );
      node.children.map((child, i) => {
        printTree(child, 1 + level);
      });

      if (node.innerHtml) {
        printSpaces(level);
        console.log(node.innerHtml);
      }
      printSpaces(level);
      console.log(`</${node.name}>`);
    }
    printTree(this, 0);
  }
}

const dom = new vDocument("html");

const div = dom.createElement("div");
const body = dom.createElement("body");
const head = dom.createElement("head");

div.innerHtml = "hey";

div.addAttribute("value", "5");

const input = dom.createElement("input");
input.addAttribute("type", "text");
input.addAttribute("required", false);
div.appendChild(input);

dom.appendChild(head);
dom.appendChild(body);

body.appendChild(div);
dom.render();
