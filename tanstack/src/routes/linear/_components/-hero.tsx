import React, { ReactElement, useEffect, useRef } from "react";
import {
  IconArrowRight,
  IconCaretDown,
  IconChevronDown,
  IconEdit,
  IconInbox,
  IconLineScan,
  IconRefresh,
  IconSearch,
  IconWaveSawTool,
  IconCube,
  IconDots,
  IconCircleOpenArrowUp,
  IconBolt,
  IconPointerFilled,
  IconPencilStar,
  IconDeviceDesktopAnalytics,
} from "@tabler/icons-react";
import LayoutContainer from "./-layout-container";
import LinearLogo from "../../../../public/linear.svg?react";

const LEFTNAV_ITEMS = {
  head: [
    { name: "Inbox", icon: IconInbox },
    { name: "My Issue", icon: IconLineScan },
    { name: "Reviews", icon: IconRefresh },
    { name: "Pulse", icon: IconWaveSawTool },
  ],
  workspace: [
    { name: "Initiatives", icon: IconCircleOpenArrowUp },
    { name: "Projects", icon: IconCube },
    { name: "More", icon: IconDots },
  ],
  favorites: [
    { name: "Faster App Launch", icon: IconBolt, color: "yellow" },
    { name: "Agent Task", icon: IconPointerFilled },
    { name: "UI Refresh", icon: IconPencilStar, color: "#7DF9FF" },
    {
      name: "Agents Insight",
      icon: IconDeviceDesktopAnalytics,
      color: "orange",
    },
  ],
};

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

  function RenderItem({
    item,
    Icon,
    color,
  }: {
    item: string;
    Icon: React.ElementType;
    color?: string;
  }) {
    return (
      <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-zinc-700/10 transition-colors ease-in-out duration-300 cursor-pointer">
        <Icon
          size={18}
          className="text-zinc-500"
          {...(color && { color, fill: color })}
        />{" "}
        <span className="text-zinc-300 text-sm font-normal">{item}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 col-span-2 p-4 relative">
      {/* header */}
      <div className="flex justify-between items-center text-zinc-700 w-full relative px-2 ">
        <div
          className="flex gap-4 items-center hover:bg-zinc-700/10 transition-colors duration-300 ease-in-out rounded p-1"
          onClick={toggleProfileSwitch}
        >
          <LinearLogo className="text-white h-[16px]" />
          <IconChevronDown size={16} />
        </div>
        <div
          className={`absolute w-full ring ring-zinc-800 bg-[#151617] rounded p-1  top-8 text-white ease-in-out duration-200 transition-all ${
            openSwitch
              ? "opacity-100 scale-3d pointer-events-auto"
              : "opacity-0  scale-3d pointer-events-none"
          }`}
          ref={popoverRef}
        >
          <div className="text-sm px-2 py-1 rounded hover:bg-zinc-700/10 ease-in transition-colors duration-300 ">
            Setting
          </div>
          <div className="text-sm px-2 py-1 rounded hover:bg-zinc-700/10  ease-in transition-colors duration-300 ">
            Logout
          </div>
        </div>
        <div className="flex items-center gap-3">
          <IconSearch size={14} stroke={3} />
          <div className="rounded ring ring-zinc-700 p-1">
            <IconEdit size={14} className="text-white/90 " />
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-4 ">
        {LEFTNAV_ITEMS?.head?.map((item) =>
          RenderItem({ item: item.name, Icon: item.icon }),
        )}
      </div>

      <div className="mt-4">
        <div className="text-zinc-500 flex items-center gap-4 text-sm px-2">
          Workspace <IconCaretDown className="size-4" fill="currentColor" />
        </div>

        <div className="flex flex-col mt-2">
          {LEFTNAV_ITEMS?.workspace?.map((item) =>
            RenderItem({ item: item.name, Icon: item.icon }),
          )}
        </div>
      </div>
      <div className="mt-4">
        <div className="text-zinc-500 flex items-center gap-4 text-sm px-2">
          Favorites <IconCaretDown className="size-4" fill="currentColor" />
        </div>

        <div className="flex flex-col mt-2">
          {LEFTNAV_ITEMS?.favorites?.map((item) =>
            RenderItem({ item: item.name, Icon: item.icon, color: item.color }),
          )}
        </div>
      </div>
    </div>
  );
}

function Board() {
  return (
    <div className="min-h-[80vh] ring rounded-xl drop-shadow-zin-500 drop-shadow-2xl  ring-zinc-800 bg-[#151617] grid grid-cols-10 p-1.5">
      <BoardSidebar />
      <div className="bg-zinc-950/20 ring ring-zinc-800 rounded-[8px] w-full flex-1 col-span-8 shadow-sm"></div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      role="contentinfo"
      className="w-screen flex-1 bg-linear-to-b from-[#08090A] via-[#1a1c1c] to-[#75797F]  xl:py-48"
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
