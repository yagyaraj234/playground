import { Menu } from '@base-ui/react/menu'
import {
  IconBrandAndroid,
  IconChartInfographic,
  IconCode,
  IconCpu2,
  IconDeviceDesktopCode,
  IconEaseInOut,
} from '@tabler/icons-react'
import { ChevronDown } from 'lucide-react'

type Item = {
  name: string
  link: string
  icon: React.ElementType
}

const Items: Item[] = [
  {
    name: 'Platform / SDK',
    link: '#',
    icon: IconDeviceDesktopCode,
  },
  { name: 'Infernece Engine', link: '#', icon: IconCpu2 },
  {
    name: 'Model conversion',
    link: '#',
    icon: IconEaseInOut,
  },
  { name: 'CLI tool', link: '#', icon: IconCode },
  {
    name: 'Cloud infernece',
    link: '#',
    icon: IconChartInfographic,
  },
  { name: 'Benchmarks', link: '#', icon: IconBrandAndroid },
]

const NavIitems = [
  {
    name: 'Model Library',
    link: '#',
  },
  {
    name: 'MacOS app',
    link: '#',
  },
  {
    name: 'Docs',
    link: '#',
  },
]

export default function Header() {
  return (
    <header className="flex justify-between items-center border-b  px-4 lg:px-8   border-zinc-800">
      <nav className="flex items-center justify-start gap-6 border-l px-4 border-zinc-800">
        <h1 className="text-2xl font-semibold text-white py-4 font-sans mr-6">
          mirai
        </h1>

        <Menu.Root>
          <Menu.Trigger
            openOnHover
            className={`max-sm:hidden flex gap-2 items-center text-text text-sm font-medium hover:bg-zinc-800 transition-colors duration-300 p-2 rounded-lg `}
          >
            Product <ChevronDown className="text-4" />
          </Menu.Trigger>
          <Menu.Portal
            className={`flex flex-col gap-2 bg-white border border-zinc-800 w-max drop-shadow-olive-50`}
          >
            <Menu.Positioner
              sideOffset={8}
              className={`bg-zinc-900 drop-shadow-2xl p-4 rounded-lg`}
              align="start"
            >
              <Menu.Popup>
                {Items.map((i, idx) => {
                  const Icon = i.icon

                  return (
                    <Menu.Item
                      key={idx}
                      className="p-1.5 w-full rounded border hover:bg-zinc-800 hover:border-zinc-700 border-zinc-900 cursor-pointer flex items-center gap-4 mr-24 transition-colors duration-200"
                    >
                      <Icon className="text-text" size={16} />
                      {i.name}{' '}
                    </Menu.Item>
                  )
                })}
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>

        <ul className="flex gap-4 items-center text-lg py-4 max-sm:hidden">
          {NavIitems?.map((item, idx) => (
            <li
              key={idx}
              className="flex  cursor-pointer gap-2 items-center text-text text-sm font-medium hover:bg-zinc-800 transition-colors duration-300 p-2 px-4 rounded-lg "
            >
              {item.name}
            </li>
          ))}
        </ul>

        <Menu.Root>
          <Menu.Trigger
            openOnHover
            className={`max-sm:hidden flex gap-2 items-center text-text text-sm font-medium hover:bg-zinc-800 transition-colors duration-300 p-2 rounded-lg `}
          >
            Company <ChevronDown className="text-4" />
          </Menu.Trigger>
          <Menu.Portal
            className={`flex flex-col gap-2 bg-white border border-zinc-800 w-max drop-shadow-olive-50`}
          >
            <Menu.Positioner
              sideOffset={8}
              className={`bg-zinc-900 drop-shadow-2xl p-4 rounded-lg`}
              align="start"
            >
              <Menu.Popup>
                {Items.map((i, idx) => {
                  const Icon = i.icon

                  return (
                    <Menu.Item
                      key={idx}
                      className="p-1.5 w-full rounded border hover:bg-zinc-800 hover:border-zinc-700 border-zinc-900 cursor-pointer flex items-center gap-4 mr-24 transition-colors duration-200"
                    >
                      <Icon className="text-text" size={16} />
                      {i.name}{' '}
                    </Menu.Item>
                  )
                })}
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      </nav>

      <nav className="flex gap-6 items-center border-r py-3.5 pr-4  border-zinc-800 h-full">
        <button className="bg-white text-zinc-950 px-4 rounded-lg py-1.5  cursor-pointer">
          Talk to us
        </button>
      </nav>
    </header>
  )
}
