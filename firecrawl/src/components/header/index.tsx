import {
  IconChevronDown,
  IconBrandGithub,
  IconMenu,
  IconX,
} from "@tabler/icons-react";
import { useState } from "react";

const MobileSidebar = () => {
  const [active, setActive] = useState(false);

  function toggle() {
    console.log("clicked");
    setActive(!active);
  }

  if (!active) {
    return <IconMenu onClick={toggle} />;
  }
  return (
    <div className="sm:hidden">
      <div className="fixed inset-0 z-50 p-4">
        <div className="fixed inset-0 bg-black opacity-30" />
        <div className="flex w-full my-6 justify-between items-center">
          <h3 className="text-xl font-semibold">Menu</h3>
          <div className="text-xl hover:cursor-pointer" onClick={toggle}>
            <IconX />
          </div>
        </div>
      </div>
    </div>
  );
};

function DropDown() {
  return (
    <div className="absolute top-5 rounded-lg p-4 left-0 min-h-[200px] hidden group-hover:flex bg-red-500 min-w-[200px]"></div>
  );
}

const Header = () => {
  return (
    <header className="flex items-center justify-between text-sm font-light my-2 py-4">
      {/* Logo*/}
      <div className="text-2xl font-bold">🔥 Firecrawl</div>

      {/* Navigation */}
      <ul className="flex gap-6 items-center max-sm:hidden">
        <li className="flex gap-1 items-center hover:cursor-pointer group relative">
          Products{" "}
          <IconChevronDown
            size={16}
            className="group-hover:rotate-180 ease-in-out"
          />
          <DropDown />
        </li>
        <li className="hover:cursor-pointer">Playground</li>
        <li className="hover:cursor-pointer">Docs</li>
        <li className="hover:cursor-pointer">Pricing</li>
        <li className="hover:cursor-pointer">Integration</li>
        <li className="hover:cursor-pointer">Blog</li>
        <li className="bg-slate-100 rounded-lg flex gap-1 items-center hover:cursor-pointer px-4 py-2 group relative">
          Resources{" "}
          <IconChevronDown
            size={16}
            className="group-hover:rotate-180 ease-in-out"
          />
          <DropDown />
        </li>
      </ul>

      {/* Actions */}
      <div className="flex gap-4 items-center max-sm:hidden">
        <button className="flex gap-2 items-center font-semibold">
          <IconBrandGithub className="opacity-60" />
          80.7K
        </button>
        <button className="text-white bg-primary rounded-lg text-shadow-sm text-accent-white px-4 py-2">
          Sign up
        </button>
      </div>
      <div className="hover:cursor-pointer opacity-70 sm:hidden">
        <MobileSidebar />
      </div>
    </header>
  );
};

export default Header;
