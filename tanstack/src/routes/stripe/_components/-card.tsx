import { cn } from "../../../lib/utils";

export function CardContainer({
  children,
  className,
  ref,
}: {
  children: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}) {
  return (
    <div
      className={cn(
        "ring-1  ring-zinc-200 rounded-lg  divide-y divide-zinc-200 min-w-[600px]",
        className,
      )}
      ref={ref}
    >
      {children}
    </div>
  );
}

export function CardContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex gap-2 items-center justify-start p-4", className)}>
      {children}
    </div>
  );
}
