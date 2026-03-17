import { createFileRoute } from "@tanstack/react-router";
import Header from "./_components/header";

export const Route = createFileRoute("/vercel/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-black text-white h-screen">
      <Header />
    </div>
  );
}
