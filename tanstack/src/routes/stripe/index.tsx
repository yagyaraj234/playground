import { createFileRoute } from "@tanstack/react-router";
import StripePaymentTabs from "./_components/-tabs";

export const Route = createFileRoute("/stripe/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="h-screen w-screen bg-white p-24 flex items-center justify-center">
      <StripePaymentTabs />
    </main>
  );
}
