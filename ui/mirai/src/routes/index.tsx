import Header from '#/components/home/header'
import Hero from '#/components/home/hero'
import Info from '#/components/home/info'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <main className="mx-auto">
      <Header />
      <Hero />
      <Info />
    </main>
  )
}
