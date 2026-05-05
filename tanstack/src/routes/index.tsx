import { Link, createFileRoute } from "@tanstack/react-router";
import { IconStarFilled } from "@tabler/icons-react";
import Header from "../components/header";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

const blocksData = [
  {
    title: "Vercel Landing",
    badge: "Page",
    description: "A landing page inspired by Vercel with sections and CTA.",
    href: "/vercel",
    preview: (
      <div className="w-full h-full bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
        <h3 className="text-white text-3xl font-bold tracking-tight mb-4">
          Build your next project in minutes, not hours.
        </h3>
        <div className="flex gap-3">
          <div className="px-4 py-1.5 bg-white text-black text-xs font-semibold rounded-full">
            Get started
          </div>
          <div className="px-4 py-1.5 bg-zinc-800 text-white text-xs font-semibold rounded-full">
            Sign up with Google
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Stripe Components",
    badge: "Components",
    description:
      "A set of UI components demonstrating payment options and tabs.",
    href: "/stripe",
    preview: (
      <div className="w-full h-full bg-zinc-50 flex items-center justify-center p-6">
        <div className="w-full max-w-sm bg-white rounded-xl shadow-sm border border-zinc-200 p-4">
          <div className="h-4 w-1/3 bg-zinc-200 rounded mb-4"></div>
          <div className="space-y-2">
            <div className="h-10 w-full bg-zinc-100 rounded border border-zinc-200"></div>
            <div className="h-10 w-full bg-zinc-100 rounded border border-zinc-200"></div>
          </div>
          <div className="h-10 w-full bg-black rounded mt-4"></div>
        </div>
      </div>
    ),
  },
  {
    title: "Logo Clouds",
    badge: "5+",
    description:
      "A collection of logo clouds with micro interactions and minimal animations",
    href: "#",
    preview: (
      <div className="w-full h-full bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
        <p className="text-zinc-400 text-sm mb-6">
          Trusted by the best companies
        </p>
        <div className="flex gap-6 items-center justify-center opacity-50">
          <div className="h-6 w-20 bg-white/20 rounded"></div>
          <div className="h-6 w-20 bg-white/20 rounded"></div>
          <div className="h-6 w-20 bg-white/20 rounded"></div>
        </div>
      </div>
    ),
  },
];

function BlockCard({ block }: { block: (typeof blocksData)[0] }) {
  return (
    <Link to={block.href} className="group flex flex-col">
      <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-zinc-100 mb-5 ring-1 ring-zinc-200/50 group-hover:ring-zinc-300 transition-all shadow-sm group-hover:shadow-md">
        <div className="absolute inset-0 p-2 pointer-events-none">
          <div className="w-full h-full border border-dashed border-zinc-300/80 rounded-xl overflow-hidden">
            {block.preview}
          </div>
        </div>
      </div>
      <div className="px-1">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-lg font-bold text-zinc-900 tracking-tight">
            {block.title}
          </h3>
          <span className="text-[10px] font-semibold text-zinc-600 bg-zinc-100 px-1.5 py-0.5 rounded ring-1 ring-zinc-200">
            {block.badge}
          </span>
        </div>
        <p className="text-sm text-zinc-500 leading-relaxed mb-4">
          {block.description}
        </p>
        <div className="flex items-center text-amber-400">
          <IconStarFilled size={16} />
        </div>
      </div>
    </Link>
  );
}

function HomeComponent() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-200">
      <Header />

      <main className="max-w-[1600px] mx-auto px-6 md:px-12 py-12 lg:py-16">
        <div className="mb-12 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-4">
            Playground Blocks
          </h1>
          <p className="text-lg text-zinc-500 leading-relaxed">
            Clean, minimal components and blocks that actually look good.
            <br className="hidden md:block" /> Built for developers who care
            about design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {blocksData.map((block, idx) => (
            <BlockCard key={idx} block={block} />
          ))}
        </div>
      </main>
    </div>
  );
}
