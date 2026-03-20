import { useState } from "react";
import "./header.css";
import { IconX, IconMenu2 } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { cn } from "../lib/utils";

function NavItems({ className }: { className?: string }) {
  return (
    <nav className={cn("hidden sm:block", className)} id="desktop-menu">
      <Link to="/">Home</Link>
      <Link to="/vercel">Vercel</Link>
      <Link to="/stripe">Stripe Components</Link>
    </nav>
  );
}
export default function Header() {
  const [signOut, setSignOut] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }
  return (
    <header>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center userimage ">
          <img
            src="https://yagyaraj.com/user.webp"
            alt="user"
            className="userimage"
          />
        </div>
        <NavItems />

        <div className="flex gap-2 items-center max-sm:hidden">
          <div
            className="ring ring-zinc-700"
            id="singin"
            onClick={() => setSignOut(!signOut)}
          >
            {signOut ? "Sign In" : "Sign Out"}
          </div>
        </div>

        <div className=" hidden max-sm:block" id="menu" onClick={toggleMenu}>
          {isOpen ? <IconX /> : <IconMenu2 />}
        </div>
      </div>

      <nav
        id="mobile-menu"
        className={`flex flex-col gap-4 fixed top-15 left-0 w-screen border-t select-none bg-zinc-900/70 ${isOpen ? "open" : ""} `}
      >
        <ul className="flex flex-col divide-y divide-zinc-800 w-full ">
          <li className="p-2 ">
            <a href="/">Home</a>
          </li>
          <li className="p-2 ">
            <a href="/vercel">Vercel Landing Page</a>
          </li>
          <li className="p-2 ">
            <a href="/stripe">Stripe Components</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
