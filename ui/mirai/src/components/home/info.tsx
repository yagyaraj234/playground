import { Accordion } from '@base-ui/react/accordion'
import {
  IconBrandSpeedtest,
  IconChevronDown,
  IconCopy,
  IconHammer,
  IconCheck,
  IconEaseInOut,
} from '@tabler/icons-react'
import { useState } from 'react'
import Container from '../container'

const AccordionItems = [
  {
    title: 'Covert',
    description: 'Convert and optimize your model for edge devices',
    items: [
      'One line model conversion.',
      'Quantize with outstanding quality.',
      'A lot of supported architectures out of the box.',
    ],
    icon: IconEaseInOut,
  },
  {
    title: 'Benchmarks',
    description: 'Designed for outstanding performance.',
    items: [
      'Ultra-low time to first token.',
      'High-throughput generation.',
      'Minimal memory usage.',
    ],
    icon: IconBrandSpeedtest,
  },
  {
    title: 'Distribute.',
    description: 'Background downloads, automatic updates, encrypted weights',
    items: [
      'Ship to user devices.',
      'Bindings for any language.',
      'Precise access control.',
    ],
    icon: IconCopy,
  },
  {
    title: 'Run',
    description: 'Advanced built-in capabilities.',
    items: [
      'Speculative decoding.',
      'Structured output.',
      'Kernel-level optimizations.',
    ],
    icon: IconHammer,
  },
]

function Terminal() {
  return (
    <div className="rounded-lg w-full bg-black">
      {/* terminal header */}
      <div className=" flex justify-between items-center min-h-6 p-2 border-b border-text">
        <div className="flex gap-1.5 items-center">
          <div className="min-w-3 min-h-3 max-w-3 max-h-3  rounded-full bg-red-400"></div>
          <div className="min-w-3 min-h-3 max-w-3 max-h-3 rounded-full bg-yellow-400"></div>
          <div className="min-w-3 min-h-3 max-w-3 max-h-3 rounded-full bg-green-400"></div>
        </div>
        <div className="text-xs font-medium font-mono "> terminal - mirai</div>
        <div></div>
      </div>
      {/*  terminal body */}
      <div className="p-2">
        user % uzu run Qwen3-0.6B Loaded: Qwen3-0.6B
        <br />
        &gt; Hi Okay, the user just said "Hi"...
        <br />
        Hi there! How can I assist you today? 😊 3.906s, 53.793t/s
        <br />
        &gt; Who are you?
        <br />
        Okay, the user asked, "Who are you?"...
        <br />
        I'm an AI assistant designed to help you with questions and tasks...
        5.217s, 52.613t/s ?
        <br />
        Send a message
      </div>
    </div>
  )
}

// #121212
function InfoAccordion() {
  const [value, setValue] = useState(['Convert'])
  return (
    <Accordion.Root
      className=" border-0 border-text divide-y divide-white/10"
      value={value}
      onValueChange={(newValue) => {
        // prevent closing the last open item
        if (newValue.length === 0) return
        setValue(newValue)
      }}
      defaultValue={value}
    >
      {AccordionItems?.map((item, idx) => (
        <Accordion.Item
          key={idx}
          className="w-full p-4 data-open:bg-zinc-900 cursor-pointer"
          value={item.title}
        >
          <Accordion.Header className={`cursor-pointer`}>
            <Accordion.Trigger
              className={`flex gap-4 items-center w-full justify-between`}
            >
              <span className="flex gap-4 items-center">
                <item.icon className="text-text " size={20} />
                <span className="text-xl font-semibold">{item.title}</span>
              </span>
              <IconChevronDown />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel>
            <div className="text-white/80 mt-2 text-lg">{item.description}</div>

            <ul className="mt-8 flex flex-col gap-2 ">
              {item.items?.map((item, idx) => (
                <li className="flex gap-4 items-center text-white/90" key={idx}>
                  {' '}
                  <IconCheck size={16} /> {item}
                </li>
              ))}
            </ul>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}

export default function Info() {
  return (
    <Container className=" my-16">
      <h3 className="text-4xl sm:text-5xl font-medium tracking-normal pb-12">
        Convert, optimize, distribute <br />{' '}
        <span className="text-white/80">
          & run your models on Apple devices.
        </span>
      </h3>

      <div className="grid sm:grid-cols-2 h-full mt-6 ring ring-white/10 max-sm:flex max-sm:flex-col-reverse ">
        <div
          className="w-full p-2 "
          style={{
            backgroundImage: "url('/images/info1.png')",
          }}
        >
          <Terminal />
        </div>
        <div className="w-full bg-zinc-800 ">
          <InfoAccordion />
        </div>
      </div>
    </Container>
  )
}
