// routes/_auth.tsx
import { IconHomeExclamation } from "@tabler/icons-react";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/practice")({
  component: () => (
    <main className="h-dvh w-dvw flex items-center justify-center relative bg-white">
      <Link
        to="/practice"
        className="absolute top-2 left-2 flex gap-2 items-center text-blue-500 lowercase text-sm"
      >
        <IconHomeExclamation size={18} /> Home
      </Link>
      <Outlet />
    </main>
  ),
});
