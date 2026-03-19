export default function PayButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="bg-purple-500/70 text-white px-4 py-2 mt-4  rounded-lg w-full text-center ">
      {children}
    </button>
  );
}
