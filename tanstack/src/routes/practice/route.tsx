// routes/_auth.tsx
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/practice")({
  component: () => (
    <main className="h-dvh w-dvw flex items-center justify-center relative bg-white">
      <Link to="/practice" className="absolute text-white top-2 left-2">
        Home
      </Link>
      <Outlet />
    </main>
  ),
});
