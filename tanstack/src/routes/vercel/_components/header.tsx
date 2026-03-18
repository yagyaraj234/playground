import { IconChevronDown } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import Button from "./button";

export default function Header() {
  return (
    <>
      <div className="flex justify-between items-center  py-4 px-6">
        <div className="flex gap-4 items-center">
          <Link to="/vercel">
            <img
              src="https://vercel.com/vc-ap-vercel-marketing/_next/static/media/vercel-logotype-dark.2944928d.svg?dpl=dpl_4S3N8kchpm6mKC1mzYCfG5fczfZ8"
              alt="vercel log"
              className="w-32 h-auto"
            />
          </Link>

          <ul className="flex gap-2 items-center">
            <li className=" group text-zinc-400 flex items-center gap-1 text-base font-light hover:text-white hover:bg-zinc-700 px-4 py-1 rounded-full ease-in-out transition-all duration-300 cursor-pointer ">
              Products
              <IconChevronDown
                size={16}
                className="group-hover:rotate-180 transition-all duration-300 ease-in-out"
              />
            </li>
            <li className="group text-zinc-400 flex items-center gap-1 text-base font-light hover:text-white hover:bg-zinc-700 px-4 py-1 rounded-full ease-in-out transition-all duration-300 cursor-pointer ">
              Resources
              <IconChevronDown
                size={16}
                className="group-hover:rotate-180 transition-all duration-300 ease-in-out"
              />
            </li>
            <li className="group text-zinc-400 flex items-center gap-1 text-base font-light hover:text-white hover:bg-zinc-700 px-4 py-1 rounded-full ease-in-out transition-all duration-300 cursor-pointer ">
              Solution
              <IconChevronDown
                size={16}
                className="group-hover:rotate-180 transition-all duration-300 ease-in-out"
              />
            </li>
            <li className="text-zinc-400 text-base font-light hover:text-white hover:bg-zinc-700 px-4 py-1 rounded-full ease-in-out transition-all duration-300 cursor-pointer ">
              <Link to="/vercel/pricing">Pricing</Link>
            </li>
            <li className="text-zinc-400 text-base font-light hover:text-white hover:bg-zinc-700 px-4 py-1 rounded-full ease-in-out transition-all duration-300 cursor-pointer ">
              <Link to="/vercel/docs">Docs</Link>
            </li>
          </ul>
        </div>
        <div className="flex gap-4 items-center">
          <Button className="bg-transparent  ring ring-zinc-700 rounded-md text-white cursor-pointer hover:bg-zinc-800/80 ease-in-out transition-all">
            Ask AI
          </Button>
          <Button className="bg-transparent  ring ring-zinc-700 rounded-md text-white cursor-pointer hover:bg-zinc-800/80 ease-in-out transition-all">
            Login
          </Button>
          <Button className="ring ring-zinc-700 rounded-md text-black bg-white  cursor-pointer hover:bg-zinc-200 ease-in-out transition-all">
            Sign Up
          </Button>
        </div>
      </div>
      <div className="h-px bg-zinc-800"></div>
    </>
  );
}
