import { createFileRoute } from "@tanstack/react-router";
import Header from "./_components/header";
import Hero from "./_components/hero";

export const Route = createFileRoute("/vercel/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Hero />
    </>
  );
}
