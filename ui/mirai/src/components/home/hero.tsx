import { IconArrowNarrowRight } from '@tabler/icons-react'

export default function Hero() {
  return (
    <main className="p-4 lg:px-8 select-none">
      <h1 className="text-5xl font-bold text-white mt-20 leading-relaxed">
        Your models. Every Applce device.
      </h1>
      <h2 className="text-5xl font-semibold text-text">
        The fastest inference engine for Apple Silicon{' '}
      </h2>

      <button className="bg-white text-zinc-950 py-3 px-6 rounded-lg my-16 cursor-pointer flex gap-6 items-center group">
        Talk to use
        <IconArrowNarrowRight
          size={20}
          className="text-black group-hover:translate-x-2 ease-in-out duration-300 "
        />
      </button>

      <div className="border border-zinc-800 p-1.5">
        <img src="./images/hero.png" height={'100%'} width={'100%'} />
      </div>
    </main>
  )
}
