type HTMLNode = string | HTMLElementNode;

type HTMLElementNode = {
  tag: string;
  children: HTMLNode[];
};

export default function serializeHTML(root: HTMLElementNode): string {
  let res = "";

  function getTabs(size: number) {
    let res = "";
    for (let i = 0; i < size; i++) {
      res += "\t";
    }
    return res;
  }
  function traverse(node: any, index = 0) {
    const tabs: any = index === 0 ? "" : `${getTabs(index)}`;
    if (!node.tag) {
      res += `${tabs}${node}\n`;
      return;
    }

    res += `${tabs}<${node.tag}>\n`;

    node.children.map((it: Element) => {
      traverse(it, index + 1);
    });
    res += `${tabs}</${node.tag}>\n`;
  }

  traverse(root, 0);
  return res.trim();
}

const tree = {
  tag: "body",
  children: [
    { tag: "div", children: [{ tag: "span", children: ["foo", "bar"] }] },
    { tag: "div", children: ["baz"] },
  ],
};

console.log(serializeHTML(tree));
// Output:
`<body>
  <div>
    <span>
      foo
      bar
    </span>
  </div>
  <div>
    baz
  </div>
</body>`;
