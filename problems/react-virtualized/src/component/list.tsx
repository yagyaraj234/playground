import { VirtualizedList } from "./virtual";
export default function List({ length }: { length: number }) {
  return (
    <div className="list">
      List: {length}
      <VirtualizedList>
        {Array.from({ length }).map((_, index) => (
          <div
            key={index}
            style={{
              border: "1px solid black",
              padding: "4px",
              borderRadius: "8px",
              margin: "4px 0",
              backgroundColor: index % 2 === 0 ? "lightgray" : "white",
              opacity: 0.8,
            }}
          >
            Item {index + 1}
          </div>
        ))}
      </VirtualizedList>
    </div>
  );
}
