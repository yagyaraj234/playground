import { cn } from '#/utils/cn'

export default function Container({
  children,
  className,
}: {
  children: React.ReactNode
  className: string
}) {
  return <div className={cn('md:max-w-6xl mx-auto', className)}>{children}</div>
}
