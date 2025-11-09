import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-between items-center p-4 max-w-7xl mx-auto w-full">
      <Link href="/" className="text-2xl font-bold flex gap-3 items-center">
        <Image src="/logo.svg" alt="Logo" width={100} height={100} />
        <div>Developer's Store</div>
      </Link>
      <div className="flex gap-6 font-medium items-center">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <Link
          href="/skin-care"
          className="hover:text-primary transition-colors"
        >
          Skin Care
        </Link>
      </div>
    </div>
  );
}
