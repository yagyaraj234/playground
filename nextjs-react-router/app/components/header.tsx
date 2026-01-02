import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center text-xl py-2">
      <h1>My App</h1>

      <nav className="flex items-center gap-4">
        <Link href="/page1" className="font-semibold text-xl ">
          Page 1
        </Link>
        <Link href="/page2" className="font-semibold text-xl ">
          Page 2
        </Link>
        <Link href="/page3" className="font-semibold text-xl ">
          Page 3
        </Link>
        <Link href="/page4" className="font-semibold text-xl ">
          Page 4
        </Link>
        <Link href="/page5" className="font-semibold text-xl ">
          Page 5
        </Link>
      </nav>
    </header>
  );
}
