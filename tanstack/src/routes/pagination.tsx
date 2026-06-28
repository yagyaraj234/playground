import { createFileRoute } from "@tanstack/react-router";
import { useInfiniteScroll } from "../hooks/use-pagination";
import { useRef } from "react";

export const Route = createFileRoute("/pagination")({
  component: RouteComponent,
});

type Post = {
  id: string;
  title: string;
};

async function fetchPosts({
  cursor,
  size,
}: {
  cursor: string | null;
  size: string;
}) {
  const params = new URLSearchParams({ size });
  if (cursor) params.set("cursor", cursor);

  const res = await fetch(`/api/posts?${params}`);
  return res.json(); // { data: Post[], next: string | null }
}

function RouteComponent() {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading, error, hasMore } = useInfiniteScroll<Post>(
    fetchPosts,
    20,
    sentinelRef,
  );

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
        </div>
      ))}

      {isLoading && <p>Loading...</p>}

      {!hasMore && <p>No more posts</p>}

      {hasMore && <div ref={sentinelRef} style={{ height: 1 }} />}
    </div>
  );
}
