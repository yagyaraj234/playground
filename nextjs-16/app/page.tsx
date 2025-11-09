import ProductCart from "@/components/product-cart";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black flex flex-col">
      <div className="relative max-w-7xl mx-auto border-4 my-4 rounded-lg border-orange-500 p-2 z-50">
        <img
          src="/cloth.jpg"
          alt="Header"
          width={100}
          height={100}
          className=" max-h-[300px] mx-auto object-cover max-w-7xl w-7xl z-10 "
        />
        <div className="absolute top-4 left-0 right-0 w-fit mt-2 mx-auto font-bold text-white bg-orange-500 px-4 py-2 rounded-lg">
          static content
        </div>
      </div>
      <main className="flex-1 mx-auto w-7xl border-4 my-4 rounded-lg border-blue-500 relative">
        <div className="absolute top-4 left-0 right-0 w-fit mt-2 mx-auto font-bold text-white bg-blue-500 px-4 py-2 rounded-lg">
          Dynamic Content
        </div>
        <ProductCart type="clothing" />
      </main>
    </div>
  );
}
