import { Menu } from '@base-ui/react/menu'
import { IconChevronDown } from '@tabler/icons-react'

type DropDownMenu<T> = {
  onSelect: (item: T) => void
  data: T[]
  selectedItem: string | number
  renderItem: (item: T) => React.ReactElement
}

export default function DropDownMenu<T>(props: DropDownMenu<T>) {
  return (
    <Menu.Root>
      <Menu.Trigger
        className={` rounded flex gap-4 items-center border font-inter text-zinc-200 border-zinc-800  py-2`}
      >
        <span className="px-4 flex items-center gap-4">
          {props.selectedItem} <IconChevronDown size={16} />
        </span>
      </Menu.Trigger>
      <Menu.Portal className={`bg-zinc-800 rounded`}>
        <Menu.Backdrop />
        <Menu.Positioner className={``} sideOffset={8} side="bottom">
          <Menu.Popup className={`bg-zinc-900 border border-zinc-700 rounded`}>
            {props.data.map((item, idx) => {
              return (
                <Menu.Item
                  className={`py-2 px-3 items-center hover:bg-zinc-800`}
                  key={idx}
                  onSelect={() => props.onSelect(item)}
                >
                  {props.renderItem(item)}
                </Menu.Item>
              )
            })}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}
