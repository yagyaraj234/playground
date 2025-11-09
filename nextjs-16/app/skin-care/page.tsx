import ProductCart from "@/components/product-cart";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black flex flex-col">
      <img
        src="/header.jpg"
        alt="Header"
        width={100}
        height={100}
        className=" max-h-[300px] mx-auto object-cover max-w-7xl w-7xl "
      />
      <main className="flex-1 mx-auto w-full">
        <ProductCart type="skin-care" />
      </main>
    </div>
  );
}
