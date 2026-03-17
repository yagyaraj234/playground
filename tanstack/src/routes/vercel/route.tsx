import { Outlet, Link, createFileRoute } from "@tanstack/react-router";
import Header from "./_components/header";

export const Route = createFileRoute("/vercel")({
  component: () => {
    return (
      <main className="bg-black text-white h-screen">
        <Header />
        <Outlet />
      </main>
    );
  },
});
