import React from "react";

export default function App() {
  const [items, setItems] = React.useState([]);
  const nextId = React.useRef(1);
  const intervals = React.useRef({});

  const openShow = () => {
    const id = nextId.current++;

    setItems((prev) => [...prev, { id, current: 0 }]);

    intervals.current[id] = setInterval(() => {
      setItems((prev) =>
        prev.map((item) => {
          if (item.id !== id) return item;

          const updated = item.current + 5;

          if (updated >= 100) {
            clearInterval(intervals.current[id]);
            delete intervals.current[id];
          }

          return {
            ...item,
            current: Math.min(updated, 100),
          };
        }),
      );
    }, 100);
  };

  React.useEffect(() => {
    return () => {
      Object.values(intervals.current).forEach(clearInterval);
    };
  }, []);

  return (
    <div>
      <button onClick={openShow}>Add</button>

      {items.map((item) => (
        <div key={item.id} className="progress">
          <div
            className="fill"
            style={{
              width: `${item.current}%`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
