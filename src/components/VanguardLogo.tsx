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
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
          style={{ width: size * 0.62, height: size * 0.62 }}
        >
          {/* Shield outline */}
          <path d="M12 2.5 L20 5.5 V12 C20 16.5 16.5 19.8 12 21.5 C7.5 19.8 4 16.5 4 12 V5.5 Z" />
          {/* Inner downward pennant */}
          <path d="M8.5 7.5 H15.5 L12 15.5 Z" strokeWidth="1.6" />
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
