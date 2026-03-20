import { createFileRoute } from "@tanstack/react-router";
import Hero from "./components/-hero";
import Footer from "./components/-footer";

export const Route = createFileRoute("/vercel/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      <Hero />
    </main>
  );
}
