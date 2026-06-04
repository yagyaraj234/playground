import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import Button from "../vercel/components/-button";
export const Route = createFileRoute("/practice/")({
  component: RouteComponent,
});

const Routes = [
  {
    name: "Accordion Problem",
    link: "/practice/accordion",
  },
  {
    name: "Custom Timer",
    link: "/practice/timer-hook",
  },
  {
    name: "File Explorer",
    link: "/practice/file-explorer",
  },
  {
    name: "Draggable List",
    link: "/practice/draggable-list",
  },
  {
    name: "Like Button",
    link: "/practice/like-button",
  },
];

function RouteComponent() {
  return (
    <div className="flex gap-4 my-2">
      {Routes.map((item, idx) => (
        <Button key={idx}>
          <Link to={item.link}>{item.name}</Link>
        </Button>
      ))}
    </div>
  );
}
