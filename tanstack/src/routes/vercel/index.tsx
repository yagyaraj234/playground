import { createFileRoute } from "@tanstack/react-router";
import Hero from "./_components/hero";
import Footer from "./_components/footer";

export const Route = createFileRoute("/vercel/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Hero />
      <Footer />
    </>
  );
}
