import { cn } from "../../../lib/utils";

export default function Button({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const baseClasses = "bg-white text-black px-4 py-2 rounded";
  return <button className={cn(baseClasses, className)}>{children}</button>;
}
