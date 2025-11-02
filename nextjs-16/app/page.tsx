import Footer from "@/components/footer";
import Header from "@/components/header";
import ProductCart from "@/components/product-cart";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black flex flex-col">
      <Header />
      <main className="flex-1">
        <ProductCart />
      </main>
      <Footer />
    </div>
  );
}
