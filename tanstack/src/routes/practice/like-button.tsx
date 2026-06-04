import { IconHeart, IconLoader } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { cn } from "../../lib/utils";

export const Route = createFileRoute("/practice/like-button")({
  component: RouteComponent,
});

const LikeButton = () => {
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleStatusChange = () => {
    setLoading((l) => !l);
    setTimeout(() => {
      setLoading((l) => !l);
      setLiked((l) => !l);
    }, 1000);
  };
  return (
    <button onClick={handleStatusChange} className="cursor-point">
      {loading ? (
        <IconLoader
          size={32}
          className={cn("animate-spin ease-in-out", {
            "text-red-400 fill-red-500": liked,
            "fill-zinc-500 text-zinc-400": !liked,
          })}
        />
      ) : (
        <></>
      )}

      {!loading ? (
        <IconHeart
          size={40}
          className={cn({
            "fill-zinc-500 text-zinc-400": !liked,
            "text-red-400 fill-red-500": liked,
          })}
        />
      ) : (
        <></>
      )}
    </button>
  );
};

function RouteComponent() {
  return <LikeButton />;
}
