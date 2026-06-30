interface Props {
  className?: string;
  variant?: "color" | "white";
  height?: number;
}

export default function Logo({ className, variant = "color", height = 36 }: Props) {
  const c = variant === "white" ? "#FFFFFF" : "#C4A234";
  const cs = variant === "white" ? "rgba(255,255,255,0.5)" : "rgba(196,162,52,0.5)";

  return (
    <svg
      height={height}
      viewBox="0 0 156 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="PoloSim"
    >
      {/* Globe icon */}
      <circle cx="20" cy="20" r="14.5" stroke={c} strokeWidth="2.2" />
      <ellipse cx="20" cy="20" rx="7" ry="14.5" stroke={c} strokeWidth="1.8" />
      <line x1="5.5" y1="20" x2="34.5" y2="20" stroke={c} strokeWidth="1.8" />
      <path d="M8.5 13C12.5 14.8 16.2 15.8 20 15.8C23.8 15.8 27.5 14.8 31.5 13" stroke={cs} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M8.5 27C12.5 25.2 16.2 24.2 20 24.2C23.8 24.2 27.5 25.2 31.5 27" stroke={cs} strokeWidth="1.2" strokeLinecap="round" />

      {/* Wordmark — Polo bold, Sim regular */}
      <text
        x="44"
        y="28"
        fontFamily="-apple-system, 'Helvetica Neue', Arial, sans-serif"
        fontSize="20"
        fontWeight="800"
        letterSpacing="-0.6"
        fill={c}
      >Polo</text>
      <text
        x="95"
        y="28"
        fontFamily="-apple-system, 'Helvetica Neue', Arial, sans-serif"
        fontSize="20"
        fontWeight="400"
        letterSpacing="-0.4"
        fill={c}
      >Sim</text>
    </svg>
  );
}
