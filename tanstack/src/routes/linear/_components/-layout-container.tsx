import { cn } from "../../../lib/utils";

export default function LayoutContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex-1 lg:max-w-6xl mx-auto", className)}>
      {children}
    </div>
  );
}
