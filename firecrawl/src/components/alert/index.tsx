import { IconArrowRight } from "@tabler/icons-react";

export default function Alert({ className }: { className: string }) {
  return (
    <div className="bg-primary w-full text-white p-3 rounded-xl flex gap-4 items-center justify-center text-sm">
      Introducing Spark 1 Pro and Spark Mini models in /agent{" "}
      <a className="underline flex gap-2 items-center">
        Try it now <IconArrowRight size={16} />
      </a>
    </div>
  );
}
