import { useState } from "react";
import "./header.css";
import { IconCross, IconMenu, IconMenu2 } from "@tabler/icons-react";
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
        <nav className="hidden sm:block" id="desktop-menu">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>

        <div className="flex gap-2 items-center max-sm:hidden">
          <button onClick={() => setSignOut(!signOut)}>
            {signOut ? "Sign In" : "Sign Out"}
          </button>
        </div>

        <div className=" hidden max-sm:block" id="menu">
          <IconMenu2 onClick={toggleMenu} />
        </div>
      </div>

      <nav
        id="mobile-menu"
        className={`flex flex-col gap-4 fixed top-15 left-0 w-screen border-t bg-blue-500 ${isOpen ? "open" : ""} `}
      >
        <ul className="flex flex-col divide-y divide-sky-200 w-full ">
          <li className="p-2 text-zinc-800 ">
            <a href="/">Home</a>
          </li>
          <li className="p-2 text-zinc-800">
            <a href="/about">About</a>
          </li>
          <li className="p-2 text-zinc-800">
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
