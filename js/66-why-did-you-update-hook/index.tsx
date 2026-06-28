import React from "react";

export const useWhyDidYouUpdate = (name, props) => {
  const lastRef = React.useRef(null);

  if (lastRef !== null) {
    const changed: string[] = [];
    const current = { ...lastRef.current, ...props };

    Object.keys(current || {}).forEach((it) => {
      if (JSON.stringify(lastRef[it]) !== JSON.stringify(props[it])) {
        // changed[it] = true;
        changed.push(it);
      }
    });

    if (changed.length > 0) {
      console.info(`${name} these props changes ${changed.join(", ")}`);
    }
  }

  lastRef.current = props;
};
