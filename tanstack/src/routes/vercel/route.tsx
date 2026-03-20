import { Outlet, Link, createFileRoute } from "@tanstack/react-router";
import Header from "./components/-header";
import Footer from "./components/-footer";

export const Route = createFileRoute("/vercel")({
  component: () => {
    return (
      <div className=" bg-black text-white min-h-screen h-full">
        <Header />
        <Outlet />
        <Footer />
      </div>
    );
  },
});
