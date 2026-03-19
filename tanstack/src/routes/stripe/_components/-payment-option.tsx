type BnplProps = {
  imagesrc: string;
  title: string;
  className?: string;
  bnpl?: boolean;
};

export default function PaymentOption({
  imagesrc,
  title,
  className,
  bnpl = false,
}: BnplProps) {
  return (
    <div
      className={`text-zinc-600 text-sm flex gap-2 items-center ${className}`}
    >
      <img src={imagesrc} alt={title} />
      <div className="flex flex-col gap-0">
        <p className="font-medium text-base text-zinc-500">{title}</p>
        {bnpl && (
          <p className="text-[10px] text-zinc-400 -mt-1">Buy Now Pay Later</p>
        )}
      </div>
    </div>
  );
}
