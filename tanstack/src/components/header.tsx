import { useState } from "react";
import {
  IconX,
  IconMenu2,
  IconMoon,
  IconShoppingCart,
  IconSearch,
} from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { cn } from "../lib/utils";

function NavItems({ className }: { className?: string }) {
  return (
    <nav
      className={cn(
        "hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-600",
        className,
      )}
    >
      <Link to="/" className="text-zinc-900">
        Home
      </Link>
      <Link to="/vercel" className="hover:text-zinc-900 transition-colors">
        Vercel
      </Link>
      <Link to="/stripe" className="hover:text-zinc-900 transition-colors">
        Stripe Components
      </Link>
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
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md">
      <div className="flex h-16 items-center px-4 md:px-8 max-w-[1600px] mx-auto justify-between lg:justify-start">
        {/* Branding */}
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight lg:mr-8">
          <div className="bg-zinc-900 text-white p-1.5 rounded-lg">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L2 22H22L12 2Z"
                fill="currentColor"
                fillOpacity="0.1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path d="M12 2L2 22H12V2Z" fill="currentColor" />
            </svg>
          </div>
          <span>Playground</span>
        </div>

        {/* Desktop Navigation */}
        <NavItems />

        {/* Right Actions */}
        <div className="ml-auto hidden lg:flex items-center gap-4">
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 bg-zinc-100 rounded-full text-zinc-500 text-sm ring-1 ring-zinc-200/50 hover:ring-zinc-300 transition-all cursor-text w-64">
            <IconSearch size={16} />
            <span>Search</span>
            <div className="ml-auto flex items-center gap-1">
              <kbd className="font-sans text-[10px] bg-white px-1.5 py-0.5 rounded border border-zinc-200 shadow-sm">
                ⌘
              </kbd>
              <kbd className="font-sans text-[10px] bg-white px-1.5 py-0.5 rounded border border-zinc-200 shadow-sm">
                K
              </kbd>
            </div>
          </div>

          <div className="flex items-center gap-3 text-zinc-600">
            <button className="hover:text-zinc-900 transition-colors">
              <IconShoppingCart size={20} stroke={1.5} />
            </button>
            <button className="hover:text-zinc-900 transition-colors">
              <IconMoon size={20} stroke={1.5} />
            </button>
            <div className="w-px h-4 bg-zinc-300 mx-1"></div>

            <img
              src="https://yagyaraj.com/user.webp"
              alt="user"
              className="w-8 h-8 rounded-full ring-1 ring-zinc-200 object-cover"
            />

            <button
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
              onClick={() => setSignOut(!signOut)}
            >
              {signOut ? "Sign In" : "Sign Out"}
            </button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center gap-4 text-zinc-600">
          <button className="hover:text-zinc-900 transition-colors">
            <IconMoon size={20} stroke={1.5} />
          </button>
          <img
            src="https://yagyaraj.com/user.webp"
            alt="user"
            className="w-8 h-8 rounded-full ring-1 ring-zinc-200 object-cover"
          />
          <button
            onClick={toggleMenu}
            className="hover:text-zinc-900 transition-colors"
          >
            {isOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="lg:hidden flex flex-col px-4 py-4 bg-white border-t border-zinc-200 absolute top-16 left-0 w-full shadow-lg">
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                to="/"
                onClick={toggleMenu}
                className="block px-4 py-2 rounded-lg hover:bg-zinc-50 text-zinc-900 font-medium"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/vercel"
                onClick={toggleMenu}
                className="block px-4 py-2 rounded-lg hover:bg-zinc-50 text-zinc-600 font-medium"
              >
                Vercel Landing Page
              </Link>
            </li>
            <li>
              <Link
                to="/stripe"
                onClick={toggleMenu}
                className="block px-4 py-2 rounded-lg hover:bg-zinc-50 text-zinc-600 font-medium"
              >
                Stripe Components
              </Link>
            </li>
            <li className="mt-4 pt-4 border-t border-zinc-100">
              <button
                className="w-full px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
                onClick={() => {
                  setSignOut(!signOut);
                  toggleMenu();
                }}
              >
                {signOut ? "Sign In" : "Sign Out"}
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
