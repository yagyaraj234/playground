import { cn } from '#/utils/cn'
import { Menu } from '@base-ui/react/menu'
import { IconChevronDown } from '@tabler/icons-react'

type ClassType = {
  trigger?: string
  popup?: string
}

type DropDownMenu<T> = {
  onSelect: (item: T) => void
  data: T[]
  selectedItem: string | number
  renderItem: (item: T) => React.ReactElement
  className?: ClassType
}

export default function DropDownMenu<T>(props: DropDownMenu<T>) {
  return (
    <Menu.Root>
      <Menu.Trigger
        className={cn(
          ' rounded flex gap-4 items-center border font-inter text-zinc-200 min-w-40 border-zinc-800  py-2',
          props.className?.trigger,
        )}
      >
        <div className="px-4 flex items-center justify-center gap-4 min-w-40">
          <span>{props.selectedItem}</span> <IconChevronDown size={16} />
        </div>
      </Menu.Trigger>
      <Menu.Portal className={`bg-zinc-800 rounded`}>
        <Menu.Backdrop />
        <Menu.Positioner className={``} sideOffset={8} side="bottom">
          <Menu.Popup
            className={cn(
              `bg-zinc-900 border border-zinc-700 rounded py-1 `,
              props.className?.popup,
            )}
          >
            {props.data.map((item, idx) => {
              return (
                <Menu.Item
                  className={`py-2 px-3 items-center hover:bg-zinc-800`}
                  key={idx}
                  onClick={() => props.onSelect(item)}
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
