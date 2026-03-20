import React, { useEffect, useRef } from "react";
import {
  IconArrowRight,
  IconChevronDown,
  IconEdit,
  IconSearch,
} from "@tabler/icons-react";
import LayoutContainer from "./-layout-container";
import LinearLogo from "../../../../public/linear.svg?react";

function BoardSidebar() {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [openSwitch, setOpenSwitch] = React.useState<boolean>(false);

  function toggleProfileSwitch() {
    setOpenSwitch(!openSwitch);
  }

  // add event to listen the click ouside of popover
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      // if click is outside the popover, close it
      if (
        popoverRef.current &&
        !popoverRef.current?.contains(e.target as Node)
      ) {
        setOpenSwitch(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col flex-1 col-span-2 p-4 relative">
      <div>
        {/* header */}
        <div className="flex justify-between items-center text-zinc-700 w-full relative ">
          <div
            className="flex gap-2 items-center hover:bg-zinc-800 transition-colors duration-300 ease-in-out rounded p-1"
            onClick={toggleProfileSwitch}
          >
            <LinearLogo className="text-white h-[12px]" />
            <IconChevronDown size={12} />
          </div>
          <div
            className={`absolute w-full ring ring-zinc-800 rounded p-1  top-8 text-white ease-in-out duration-200 transition-all ${
              openSwitch
                ? "opacity-100 scale-3d pointer-events-auto"
                : "opacity-0  scale-3d pointer-events-none"
            }`}
            ref={popoverRef}
          >
            <div className="text-sm px-2 py-1 rounded hover:bg-zinc-800/60 ease-in transition-colors duration-300 ">
              Setting
            </div>
            <div className="text-sm px-2 py-1 rounded hover:bg-zinc-800/60  ease-in transition-colors duration-300 ">
              Logout
            </div>
          </div>
          <div className="flex items-center gap-2">
            <IconSearch size={12} stroke={3} />
            <div className="rounded ring ring-zinc-700 p-1">
              <IconEdit size={12} color="white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Board() {
  return (
    <div className="min-h-[70vh] ring rounded-lg drop-shadow-amber-50  ring-zinc-800 bg-[#151617] grid grid-cols-12">
      <BoardSidebar />
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      role="contentinfo"
      className="w-screen flex-1 bg-linear-to-b from-[#08090A] via-[#1f2222] to-[#75797F]  xl:mt-48"
    >
      <LayoutContainer>
        <div role="heading" className="mb-12">
          <h1 className="lg:text-5xl w-7/12 font-inter leading-14">
            The product development system for teams and agents
          </h1>

          <div className="flex text-sm transition-colors duration-300 ease-in-out text-white/20 font-thin justify-between items-center mt-6 w-full">
            <h2>
              Purpose-built for planning and building products. Designed for the
              AI era.
            </h2>

            <div className="flex items-center gap-3 hover:text-white/40 cursor-default ">
              <span className="text-white">New</span>
              Linear Diff <IconArrowRight size={16} />
            </div>
          </div>
        </div>
        <Board />
      </LayoutContainer>
    </section>
  );
}
