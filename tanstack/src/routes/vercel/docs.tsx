import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/vercel/docs")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/vercel/docs"!</div>;
}
