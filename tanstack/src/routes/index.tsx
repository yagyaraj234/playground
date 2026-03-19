import { createFileRoute } from "@tanstack/react-router";
import Header from "../components/header";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="relative">
      <Header />
    </div>
  );
}
