import { useState } from 'react'
import DropDownMenu from '../menu'

type DataSetType = {
  Models: string[]
  Chips: string[]
}

const DataSet: DataSetType = {
  Models: [
    'Llama-3.2-1B-Instruct',
    'LFM2-1.2B',
    'LFM2-1.2B-4bit',
    'LFM2-350M-4bit',
    'Llama-3.2-3B-Instruct-AWQ',
    'Qwen3-0.6B',
  ],
  Chips: [
    'M1 Max',
    'M1 Ultra',
    'M2',
    'M2 Max',
    'M3 Max',
    'M3 Ultra',
    'M4 Max',
    'M5',
    'iPhone 16 Pro Max',
    'iPhone 17 Pro Max',
  ],
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
    <div className="px-4 lg:px-8 my-16">
      <h3 className="text-4xl sm:text-5xl font-medium tracking-normal pb-12">
        What Apple Silicon <br />{' '}
        <span className="text-white/80">delivers today with Mirai.</span>
      </h3>

      <div className="border border-zinc-800 bg-zinc-900 p-8">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-semibold">Benchmarks</div>
          <div className="flex gap-8 items-center">
            <DropDownMenu
              onSelect={handleChangeModel}
              data={DataSet['Models']}
              selectedItem={DataSet['Models'][0]}
              renderItem={(item: string) => <button>{item}</button>}
            />
            <DropDownMenu
              onSelect={handleChangeModel}
              data={DataSet['Chips']}
              selectedItem={DataSet['Chips'][0]}
              renderItem={(item: string) => <button>{item}</button>}
            />
          </div>
        </div>

        <div className="flex items-center justify-between py-4 my-3 border-y border-zinc-800">
          <div>{selectedItem['Model']}</div>
          <div>Measurements were done with real hardware</div>
        </div>
      </div>
    </div>
  )
}
