import { useEffect, useRef, useState, type ReactNode } from "react";

export default function VirtualizedList({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [elementHeight, setElementHeight] = useState(0);
  const [totalElementInView, setTotalElementInView] = useState(10);

  //   const { height, width } = ref.current?.getBoundingClientRect() || {
  //     height: 0,
  //     width: 0,
  //   };

  let height = 0;
  let width = 0;

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    height = ref.current.offsetHeight;
    width = ref.current.offsetWidth;

    const elementHeight = 0;

    //   get the first height of first child from ref
    const firstChildOffsetTop = ref.current.children[0]?.offsetTop || 0;
    const secondChildOffsetTop = ref.current.children[1]?.offsetTop || 0;

    const totalGap = secondChildOffsetTop - firstChildOffsetTop;
    if (totalGap > 0) {
      setElementHeight(totalGap);

      const totalElementInView = height / totalGap;
      setTotalElementInView(Math.ceil(totalElementInView));
    }

    // add listener for scroll event
    ref.current.addEventListener("scroll", () => {
      const scrollTop = ref.current?.scrollTop || 0;
      const firstVisibleIndex = Math.floor(scrollTop / totalGap);
      const lastVisibleIndex = firstVisibleIndex + totalElementInView;
      console.log({
        firstVisibleIndex,
        lastVisibleIndex,
        scrollTop,
        elementHeight,
      });

      // now if you have firstVisibleIndex and lastVisibleIndex
      // you can render the elements between these indexes
      // and remove the elements which are not visible
      if (!children) {
        return;
      }
      const visibleChildren = children.slice(
        firstVisibleIndex,
        lastVisibleIndex,
      );
    });

    return () => {
      ref.current?.removeEventListener("scroll", () => {});
    };
  }, []);

  console.log({
    totalElementInView,
    elementHeight,
  });

  return (
    <>
      <div>
        {height}px {width}px
      </div>
      <div className="container" ref={ref}>
        {children}
      </div>
    </>
  );
}
