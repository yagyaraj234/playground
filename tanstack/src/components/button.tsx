import { cn } from "../lib/utils";

export default function Button({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 rounded-lg text-white bg-zinc-800 text-sm drop-shadow-xl ring ring-zinc-700",
        className,
      )}
    >
      {children}
    </button>
  );
}
