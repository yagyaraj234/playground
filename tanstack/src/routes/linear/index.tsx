import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/linear/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <main></main>;
}
