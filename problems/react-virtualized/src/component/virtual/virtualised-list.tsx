import {
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  type ReactNode,
} from "react";

type VirtualizedListProps<T> = {
  data: T[];
  height: number;
  render: (item: T, index: number) => ReactNode;
};

export default function VirtualizedList<T>({
  data,
  render,
}: VirtualizedListProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  const [rowHeight, setRowHeight] = useState<number | null>(38);
  const [range, setRange] = useState({ start: 0, end: 10 });

  // Measure row height
  useEffect(() => {
    if (!measureRef.current) return;

    const h = measureRef.current.getBoundingClientRect().height;
    if (h > 0) {
      console.log("setting rowHeight", h);
      setRowHeight(38);
    }
  }, []);

  // Attach scroll logic after height known
  useEffect(() => {
    if (!containerRef.current || !rowHeight) return;

    const el = containerRef.current;
    const height = el.clientHeight;
    const itemsInView = Math.ceil(height / rowHeight);

    const handleScroll = () => {
      const scrollTop = el.scrollTop;

      const start = Math.floor(scrollTop / 38);
      console.log("start", start);
      const end = start + itemsInView;

      setRange({ start, end });
    };

    el.addEventListener("scroll", handleScroll);

    return () => el.removeEventListener("scroll", handleScroll);
  }, [rowHeight]);

  // Before height is known render a small batch
  if (!rowHeight) {
    return (
      <div ref={containerRef} style={{ overflow: "auto" }}>
        {data.slice(0, 10).map((item, i) => (
          <div key={i} ref={i === 0 ? measureRef : undefined}>
            {render(item, i)}
          </div>
        ))}
      </div>
    );
  }

  const visibleItems = data.slice(range.start, range.end);

  console.log(
    "total render",
    visibleItems.length,
    "range",
    range.start,
    range.end,
  );

  return (
    <div
      ref={containerRef}
      style={{
        overflowY: "auto",
        position: "relative",
      }}
      className="container"
    >
      <div
        style={{
          height: data.length * rowHeight,
          position: "relative",
        }}
      >
        <div
          style={{
            transform: `translateY(${range.start * rowHeight}px)`,
          }}
        >
          {visibleItems.map((item, i) => render(item, range.start + i))}
        </div>
      </div>
    </div>
  );
}
