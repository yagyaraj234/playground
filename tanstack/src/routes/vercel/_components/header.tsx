import Button from "./button";

export default function Header() {
  return (
    <div className="flex justify-between items-center  py-4 px-6 ">
      <div className="flex gap-4 items-center">
        <img
          src="https://vercel.com/vc-ap-vercel-marketing/_next/static/media/vercel-logotype-dark.2944928d.svg?dpl=dpl_4S3N8kchpm6mKC1mzYCfG5fczfZ8"
          alt="vercel log"
          className="w-32 h-auto"
        />

        <ul className="flex gap-2 items-center">
          <li className="text-zinc-400 text-base font-light hover:text-white hover:bg-zinc-700 px-4 py-1.5 rounded-full ease-in-out transition-all duration-300 cursor-pointer ">
            Products
          </li>
          <li className="text-zinc-400 text-base font-light hover:text-white hover:bg-zinc-700 px-4 py-1.5 rounded-full ease-in-out transition-all duration-300 cursor-pointer ">
            Resources
          </li>
          <li className="text-zinc-400 text-base font-light hover:text-white hover:bg-zinc-700 px-4 py-1.5 rounded-full ease-in-out transition-all duration-300 cursor-pointer ">
            Solution
          </li>
          <li className="text-zinc-400 text-base font-light hover:text-white hover:bg-zinc-700 px-4 py-1.5 rounded-full ease-in-out transition-all duration-300 cursor-pointer ">
            Pricing
          </li>
          <li className="text-zinc-400 text-base font-light hover:text-white hover:bg-zinc-700 px-4 py-1.5 rounded-full ease-in-out transition-all duration-300 cursor-pointer ">
            Docs
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
  );
}
