interface Props {
  buyUrl: string;
  label?: string;
  popular?: boolean;
  className?: string;
}

export default function BuyButton({ buyUrl, label = "Jetzt kaufen", popular, className = "" }: Props) {
  return (
    <a
      href={buyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`block w-full text-center font-semibold py-3 rounded-pill text-sm transition-all
        ${popular
          ? "bg-gold hover:bg-gold-dark text-white shadow-gold hover:shadow-none"
          : "bg-ivory hover:bg-sand text-ink border border-sand hover:border-gold/40"
        } ${className}`}
    >
      {label}
    </a>
  );
}
