import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-between items-center p-4">
      <h1 className="text-2xl font-bold">My Website</h1>

      <div>
        <Link href="/">Home</Link>
      </div>
    </div>
  );
}
