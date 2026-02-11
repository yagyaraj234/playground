import {
  IconArrowNarrowRight,
  IconCircleArrowRightFilled,
  IconGlobe,
  IconWorld,
} from "@tabler/icons-react";
import { useState } from "react";

interface Item {
  id: number;
  name: string;
}

const Items: Item[] = [
  {
    id: 1,
    name: "Scrape",
  },
  {
    id: 2,
    name: "Search",
  },
  {
    id: 3,
    name: "Agent",
  },
  { id: 4, name: "Map" },
  { id: 5, name: "Crawl" },
];

function Input() {
  const [activeItem, setActiveItem] = useState(Items[0]);

  function handleSwitch(item: Item) {
    setActiveItem(item);
  }
  return (
    <div
      className="rounded-2xl border border-zinc-200 max-w-xl w-full
     py-4 flex flex-col gap-4 my-12 "
    >
      <div className="flex gap-4 items-center border-b border-zinc-200 pb-4 px-4">
        <IconWorld className="text-zinc-200" />
        <input
          placeholder="https://example.com"
          className="outline-none border-none placeholder:text-zinc-200 text-sm"
        />
      </div>
      <div className="flex justify-between items-center px-4">
        <div className="bg-zinc-300 flex gap-2 p-0.5 rounded-md">
          {Items.map((item) => (
            <button
              onClick={() => handleSwitch(item)}
              key={item.id}
              className={`p-2 rounded-md text-sm cursor-pointer ${activeItem.id === item.id && "bg-background"}`}
            >
              {item.name}
            </button>
          ))}
        </div>

        <button className="bg-primary rounded-lg px-4 py-2 drop-shadow-2xl text-white">
          <IconArrowNarrowRight />
        </button>
      </div>
    </div>
  );
}

const HeroSection = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center my-24">
      <div className="rounded-full px-2 py-1 border border-gray-400 text-zinc-700 text-xs flex gap-2 items-center">
        2 Months Free - Annually
        <IconCircleArrowRightFilled size={20} />
      </div>
      <div className="text-6xl max-w-xl leading-tight text-center font-semibold text-zinc-800 text-shadow-xs">
        Turn websites into <span className="text-primary">LLM-ready</span> data
      </div>

      <p className="text-center text-zinc-800 font-normal">
        Power your AI apps with clean web data <br /> from any website.{" "}
        <span className="bg-gray-200 rounded-lg px-2">
          It's also open source
        </span>{" "}
      </p>
      <Input />
    </div>
  );
};

export default HeroSection;
