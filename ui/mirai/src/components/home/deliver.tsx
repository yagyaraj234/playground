import { useState } from 'react'
import DropDownMenu from '../menu'
import { IconArrowRight } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'
import Container from '../container'
import { STATS, DataSet, type StatCard } from './data'

function StatsSection({ stats }: { stats: StatCard[] }) {
  return (
    <>
      {stats.map((item) => (
        <div key={item.id} className="flex flex-col gap-4">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-semibold text-cyan-400">
              {item.value}
            </span>
            {item.unit && (
              <span className="text-gray-400 text-lg">{item.unit}</span>
            )}
          </div>

          <h3 className="text-white text-lg font-medium w-3/4">{item.title}</h3>

          <p className="text-gray-400 text-sm leading-relaxed w-3/4">
            {item.description}
          </p>

          <Link
            to={item.linkLabel}
            className="text-cyan-400 text-sm flex items-center gap-1 hover:underline"
          >
            {item.linkLabel}
            <IconArrowRight className="-rotate-45" size={16} />
          </Link>
        </div>
      ))}
    </>
  )
}

export default function Deliverables() {
  const [selectedItem, setSelectedItem] = useState({
    Model: DataSet['Models'][0],
    Chip: DataSet['Chips'][0],
  })

  function handleChangeModel(item: string) {
    setSelectedItem((p) => ({
      ...p,
      Model: item,
    }))
  }
  function handleChangeChip(item: string) {
    setSelectedItem((p) => ({ ...p, Chip: item }))
  }
  return (
    <Container className="max-sm:px-4 my-16">
      <h3 className="text-4xl sm:text-5xl font-medium tracking-normal pb-12">
        What Apple Silicon <br />{' '}
        <span className="text-white/80">delivers today with Mirai.</span>
      </h3>

      <div className="border border-zinc-800 bg-zinc-900/50 p-8">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-semibold">Benchmarks</div>
          <div className="flex gap-8 items-center">
            <DropDownMenu
              onSelect={handleChangeModel}
              data={DataSet['Models']}
              selectedItem={selectedItem['Model']}
              renderItem={(item: string) => <button>{item}</button>}
              className={{
                trigger: 'min-w-60 justify-center',
              }}
            />
            <DropDownMenu
              onSelect={handleChangeChip}
              data={DataSet['Chips']}
              selectedItem={selectedItem['Chip']}
              renderItem={(item: string) => <button>{item}</button>}
            />
          </div>
        </div>

        <div className="flex items-center justify-between py-4 my-3 border-y border-zinc-800">
          <div>{selectedItem['Model']}</div>
          <div>Measurements were done with real hardware</div>
        </div>
      </div>

      <div className="border border-zinc-800 bg-zinc-900/50 p-8 grid grid-cols-4 gap-x-6 my-12">
        <StatsSection stats={STATS} />
      </div>
    </Container>
  )
}
