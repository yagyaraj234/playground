// Use this data to create the shape
import React from "react";
const BOX_DATA = [
  [1, 1, 1],
  [1, 0, 0],
  [1, 1, 1],
];

function BOX({ item, id, selected, setSelected }) {
  if (item == 0) return null;
  function handleClick() {
    if (selected) {
      setSelected((items) => items.filter((it) => it !== id));
      return;
    }
    setSelected((items) => [...items, id]);
  }
  return (
    <div
      className="box"
      style={{
        background: selected ? "#0bcc59" : "transparent",
      }}
      onClick={handleClick}
    ></div>
  );
}

function travareseArr(arr, count = 0) {
  for (let i = 0; i < arr.length; i++) {
    const curr = arr[i];
    if (Array.isArray(curr)) {
      count = travareseArr(curr, count);
    } else if (curr === 1) {
      count++;
    }
  }

  return count;
}

export default function App() {
  const [selectedOptions, setSelectedOptions] = React.useState([]);
  const [clearing, setClearing] = React.useState(false);

  const totalVisibleElements = React.useMemo(() => {
    const len = travareseArr(BOX_DATA);
    console.log("len", len);
    return len;
  }, [BOX_DATA]);

  React.useEffect(() => {
    if (clearing) {
    } else if (totalVisibleElements !== selectedOptions.length) return;
    setClearing(true);
    const id = setInterval(() => {
      setSelectedOptions((prev) => {
        if (prev.length === 0) {
          clearInterval(id);
          setClearing(false);
          return prev;
        }

        return prev.slice(1);
      });
    }, 500);

    return () => {
      clearInterval(id);
    };
  }, [selectedOptions, totalVisibleElements]);

  function handleSelect(items) {
    if (clearing) return;
    setSelectedOptions(items);
  }

  return (
    <main>
      {BOX_DATA?.map((items, index) => {
        if (Array.isArray(items)) {
          return (
            <div className="items-row">
              {items.map((item, idx) => {
                const id = `${index}-${idx}-${item}`;
                return (
                  <BOX
                    item={item}
                    selected={selectedOptions.includes(id)}
                    setSelected={handleSelect}
                    key={id}
                    id={id}
                  />
                );
              })}
            </div>
          );
        }
      })}
    </main>
  );
}
