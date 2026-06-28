import React, { useCallback, useEffect, useRef, useTransition } from "react";

type CursorResponse<T> = {
  data: T[];
  next: string | null;
};

type FetchFn<T> = (params: {
  cursor: string | null;
  size: string;
}) => Promise<CursorResponse<T>>;

export const useInfiniteScroll = <T,>(
  fetchFn: FetchFn<T>,
  size: number,
  ref: React.RefObject<HTMLElement | null>,
): { data: T[]; isLoading: boolean; error: Error | null; hasMore: boolean } => {
  const [isPending, startTransition] = useTransition();
  const [data, setData] = React.useState<T[]>([]);
  const [error, setError] = React.useState<Error | null>(null);
  const [hasMore, setHasMore] = React.useState(true);
  const cursorRef = useRef<string | null>(null);
  const loadingRef = useRef(false);

  const execute = useCallback(() => {
    if (loadingRef.current || !hasMore) return;
    loadingRef.current = true;

    startTransition(async () => {
      try {
        const { data, next } = await fetchFn({
          cursor: cursorRef.current,
          size: size.toString(),
        });

        if (data) {
          cursorRef.current = next;
          setHasMore(!!next);
          setData((d) => [...d, ...data]);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        loadingRef.current = false;
      }
    });
  }, [fetchFn, size, hasMore]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) execute();
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [execute]);

  return { data, isLoading: isPending, error, hasMore };
};
