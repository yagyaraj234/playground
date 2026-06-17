import { Link } from "@tanstack/react-router";
import LayoutContainer from "./-layout-container";
import { cn } from "../../../lib/utils";
import LinearLogo from "../../../../public/linear.svg?react";

const NavItems = [
  {
    name: "Product",
  },
  {
    name: "Resources",
  },
  {
    name: "Customers",
  },
  {
    name: "Pricing",
  },
  {
    name: "Now",
  },
  {
    name: "Contact",
  },
];

function NavLink({ item, className }: { item: any; className?: string }) {
  return (
    <a
      href={item.href || "#"}
      className={cn(
        "text-[13px] leading-relaxed font-inter text-zinc-400 hover:text-white transition-all duration-300 ease-in-out hover:bg-zinc-800/70 rounded px-2 py-1",
        className,
      )}
    >
      {item.name}
    </a>
  );
}

export default function Header() {
  return (
    <header className="border-b border-zinc-800 bg-[#090A0A]">
      <LayoutContainer className="flex justify-between items-center py-4">
        <LinearLogo className="text-white h-5 w-auto" />
        <div className="flex items-center">
          {NavItems?.map((it) => (
            <NavLink item={it} />
          ))}
          <div className="h-4 w-px bg-zinc-800 mx-3"></div>
          <NavLink
            item={{
              href: "/login",
              name: "Log in",
            }}
          />

          <NavLink
            item={{
              href: "/signup",
              name: "Sign up",
            }}
            className="bg-white/90 text-zinc-800 hover:bg-white hover:text-zinc-800 ml-3"
          />
        </div>
      </LayoutContainer>
    </header>
  );
}
