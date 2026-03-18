import {
  IconBuilding,
  IconGitMerge,
  IconShieldCheck,
  IconTerminal,
  IconWorld,
} from "@tabler/icons-react";
import Button from "./-button";

export default function Hero() {
  return (
    <div className="sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl flex flex-col mx-auto h-full  ring-1 ring-zinc-900 my-24  ">
      <div className=" flex flex-col items-center justify-center  w-full h-9/12  py-32 ">
        <div className="flex flex-col gap-6 line-clamp-3 leading-relaxed text-center ">
          <h1 className="text-6xl font-medium geist-600">
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
      <div className="h-px bg-zinc-800"></div>
      <div className="py-12">
        <h2 className="md:text-3xl font-normal tracking-wide text-white text-center max-w-3xl mx-auto flex items-center justify-center flex-wrap leading-[1.6]">
          <span>Develop with your favorite tools</span>{" "}
          <IconTerminal size={28} className="mx-2" /> <br />{" "}
          <span>Launch globally, instantly</span>{" "}
          <IconWorld size={28} className="mx-2" /> <span>Keep pushing</span>{" "}
          <IconGitMerge size={28} className="mx-2" />
        </h2>
      </div>
      <div className="h-px bg-zinc-800"></div>
      <div className="py-12">
        <h2 className="md:text-3xl font-normal tracking-wide text-white text-center max-w-4xl mx-auto flex items-center justify-center flex-wrap leading-[1.6]">
          Scale your{" "}
          <span className="p-2.5 text-base font-normal rounded-full bg-transparent ring-1 ring-zinc-800 text-white flex gap-2 items-center mx-2">
            <IconBuilding size={20} /> Enterprise
          </span>{" "}
          without compromising
          <span className="p-2.5 text-base font-normal rounded-full bg-transparent ring-1 ring-zinc-800 text-white flex gap-2 items-center mx-2">
            <IconShieldCheck size={20} /> Security
          </span>{" "}
        </h2>
      </div>

      <div className="h-px bg-zinc-800"></div>
      <div className=" flex items-center justify-center  gap-6">
        <div className="w-1/3 py-16 px-12 border-dashed border-r border-zinc-800">
          <div className="text-[26px] geist-400 leading-relaxed tracking-tight overflow-x-visible text-nowrap z-10 ">
            <p>
              Ready to deploy?
              <span className="text-zinc-400">
                {" "}
                Start building with a free account.
              </span>{" "}
            </p>
            <p className="text-zinc-400">
              {" "}
              Speak to an expert for your{" "}
              <span className="text-blue-400">Pro</span> or{" "}
              <span className="text-purple-400"> Enterprise</span> needs.
            </p>
          </div>
          <div className="flex gap-4 items-center mt-6">
            <Button className="bg-white text-black rounded-full px-4 py-3">
              Start Deploying
            </Button>
            <Button className=" px-4 py-3 bg-transparent text-white ring ring-zinc-700 rounded-full drop-shadow-sm">
              Talk to an Expert
            </Button>
          </div>
        </div>
        <hr className="h-full  min-h-full" />
        <div className="w-1/3 min-h-full py-16 px-12"></div>
        <div className="w-1/3 py-16  border-dashed border-l border-zinc-800  px-12">
          <p>
            Explore Vercel Enterprise with an interactive product tour, trial,
            or a personalized demo.
          </p>
          <Button className="px-4 py-3 mt-6 bg-transparent text-white ring ring-zinc-700 rounded-full drop-shadow-sm">
            Explore Enterprise
          </Button>
        </div>
      </div>
    </div>
  );
}
