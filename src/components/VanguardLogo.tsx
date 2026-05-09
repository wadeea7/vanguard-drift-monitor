export function VanguardLogo({
  size = 40,
  withText = true,
  tagline = false,
}: {
  size?: number;
  withText?: boolean;
  tagline?: boolean;
}) {
  const gradId = `vg-grad-${size}`;
  return (
    <div className="flex items-center gap-3">
      <div
        className="relative flex items-center justify-center rounded-[28%] bg-card/70 border border-primary/30 logo-glow"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ width: size * 0.62, height: size * 0.62 }}
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7DD3FC" />
              <stop offset="100%" stopColor="#0891B2" />
            </linearGradient>
          </defs>
          {/* Shield outline — rounded, thick stroke */}
          <path
            d="M24 4 L40 9 V22 C40 31 33 38 24 42 C15 38 8 31 8 22 V9 Z"
            stroke={`url(#${gradId})`}
            strokeWidth="3"
          />
          {/* Inner mark: vertical stem + downward triangle (plumb / pennant) */}
          <path
            d="M24 14 V20"
            stroke={`url(#${gradId})`}
            strokeWidth="2.6"
          />
          <path
            d="M16 20 H32 L24 32 Z"
            stroke={`url(#${gradId})`}
            strokeWidth="2.6"
          />
        </svg>
      </div>
      {withText && (
        <div className="flex flex-col leading-tight">
          <span className="text-lg font-bold tracking-[0.2em] text-primary title-glow">
            VANGUARD
          </span>
          {tagline && (
            <span className="text-[10px] tracking-widest text-muted-foreground font-medium">
              AI GOVERNANCE & RISK
            </span>
          )}
        </div>
      )}
    </div>
  );
}
