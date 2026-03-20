import { createFileRoute } from "@tanstack/react-router";
import HeroSection from "./_components/-hero";

export const Route = createFileRoute("/linear/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex-1">
      <HeroSection />
    </main>
  );
}
