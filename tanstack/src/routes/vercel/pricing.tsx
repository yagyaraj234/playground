import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/vercel/pricing')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/vercel/pricing"!</div>
}
