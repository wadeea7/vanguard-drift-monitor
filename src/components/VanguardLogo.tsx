import { Shield } from "lucide-react";

export function VanguardLogo({
  size = 40,
  withText = true,
  tagline = false,
}: {
  size?: number;
  withText?: boolean;
  tagline?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="relative flex items-center justify-center rounded-2xl bg-card/80 border border-primary/40 logo-glow"
        style={{ width: size, height: size }}
      >
        <Shield
          className="text-primary"
          style={{ width: size * 0.6, height: size * 0.6 }}
          strokeWidth={2}
        />
        {/* Inner downward arrow / pennant mark */}
        <svg
          className="absolute"
          style={{ width: size * 0.32, height: size * 0.32, top: size * 0.22 }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 4h14l-7 16z" className="text-primary" />
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
