type ChipsType = {
  tokens: number
  name: string
}

type DataSetType = {
  Models: string[]
  Chips: string[]
}

export const DataSet: DataSetType = {
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

export type StatCard = {
  value: string
  unit?: string
  title: string
  description: string
  linkLabel: string
  id: number
}

export const STATS: StatCard[] = [
  {
    id: 1,
    value: '89',
    unit: '%',
    title: 'Real-world AI queries',
    description: 'Can be served locally on consumer hardware.',
    linkLabel: 'Stanford IPW',
  },
  {
    id: 2,
    value: '38',
    unit: 'TOPS',
    title: 'Neural Engine on M4',
    description: 'Mirai squeezes everything out of it.',
    linkLabel: 'Apple specs',
  },
  {
    id: 3,
    value: '120',
    unit: 'GB/s',
    title: 'Unified memory bandwidth on M4',
    description: 'Your model loads once, runs everywhere on chip.',
    linkLabel: 'Apple specs',
  },
  {
    id: 4,
    value: '198',
    unit: 't/s',
    title: 'Qwen3-0.6B on M4 Max',
    description: 'Fast real-time generation on device.',
    linkLabel: 'Benchmarks',
  },
]

export const ModelStats = [
  {
    description: 'Time to first token, s ',
    token: 1.032,
    extra: 0.024,
  },
  {
    description: 'Prompt, t/s',
    token: 1490.658,
    extra: 34.871,
  },
  {
    description: 'Generate, t/s ',
    token: 121.082,
    extra: 1.077,
  },
]
