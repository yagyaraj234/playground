import { VirtualizedList } from "./virtual";
export default function List({ length }: { length: number }) {
  return (
    <div className="list">
      List: {length}
      <VirtualizedList
        data={Array.from({ length }, (v, i) => ({
          id: i + 1,
          name: `User ${i + 1}`,
        }))}
        render={($item, idx, list) => {
          return (
            <div
              key={$item.id}
              style={{
                border: "1px solid black",
                padding: "4px",
                borderRadius: "8px",
                margin: "4px 0",
                backgroundColor: idx % 2 === 0 ? "lightgray" : "white",
                opacity: 0.8,
              }}
            >
              {`${$item.id}: ${$item.name}`}
            </div>
          );
        }}
      ></VirtualizedList>
    </div>
  );
}
