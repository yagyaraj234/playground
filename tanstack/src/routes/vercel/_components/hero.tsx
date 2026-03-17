import { IconGitMerge, IconTerminal, IconWorld } from "@tabler/icons-react";
import Button from "./button";

export default function Hero() {
  return (
    <div className="sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl flex flex-col mx-auto h-screen  ring-1 ring-zinc-900 my-12  ">
      <div className=" flex flex-col items-center justify-center  w-full h-9/12 border-b-[0.2px] border-zinc-900 ">
        <div className="flex flex-col gap-6 line-clamp-3 leading-relaxed text-center ">
          <h1 className="text-6xl font-medium">
            Build and deploy on the AI Cloud.
          </h1>
          <h2 className="text-xl tracking-wide leading-loose text-balance font-light text-zinc-400">
            Vercel provides the developer tools and cloud infrastructure to
            build, <br />
            scale, and secure a faster, more personalized web.
          </h2>
          <div className="flex gap-6 items-center justify-center">
            <Button className="bg-white text-black rounded-full">
              Start Deploying
            </Button>
            <Button className="bg-transparent text-white ring ring-zinc-700 rounded-full drop-shadow-sm">
              Get A Demo
            </Button>
          </div>
        </div>
      </div>
      <div className="py-12">
        <h2 className="md:text-3xl font-normal tracking-wide text-white text-center max-w-3xl mx-auto flex items-center justify-center flex-wrap leading-[1.6]">
          <span>Develop with your favorite tools</span>{" "}
          <IconTerminal size={28} className="mx-2" /> <br />{" "}
          <span>Launch globally, instantly</span>{" "}
          <IconWorld size={28} className="mx-2" /> <span>Keep pushing</span>{" "}
          <IconGitMerge size={28} className="mx-2" />
        </h2>
      </div>
    </div>
  );
}
