import { Outlet, Link, createFileRoute } from "@tanstack/react-router";
import Header from "./_components/-header";

export const Route = createFileRoute("/linear")({
  component: () => {
    return (
      <div className=" bg-[#08090A] text-white min-h-screen h-full font-inter">
        <Header />
        <Outlet />
      </div>
    );
  },
});
