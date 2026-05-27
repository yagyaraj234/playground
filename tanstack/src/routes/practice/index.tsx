import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import Button from "../vercel/components/-button";
export const Route = createFileRoute("/practice/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex gap-4 my-2">
      <Button>
        <Link to="/practice/accordion">Accordion Problem</Link>
      </Button>
      <Button>
        <Link to="/practice/timer-hook">Custom Timer</Link>
      </Button>
    </div>
  );
}
