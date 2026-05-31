export default function getElementsByStyle(
  element: Element,
  property: string,
  value: string,
): Array<Element> {
  const elements: Element[] = [];

  function traverse(node: Element) {
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      const style = (child as HTMLElement).style.getPropertyValue(property);

      if (style === value) {
        elements.push(child);
      }

      traverse(child);
    }
  }

  traverse(element);

  return elements;
}
