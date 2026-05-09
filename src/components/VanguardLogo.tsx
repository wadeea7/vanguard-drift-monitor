import { Shield } from "lucide-react";

export function VanguardLogo({ size = 40, withText = true, tagline = false }: { size?: number; withText?: boolean; tagline?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="relative flex items-center justify-center rounded-2xl gradient-brand glow-cyan"
        style={{ width: size, height: size }}
      >
        <Shield className="text-white" style={{ width: size * 0.55, height: size * 0.55 }} strokeWidth={2.5} />
        <svg
          className="absolute inset-0 opacity-40"
          viewBox="0 0 40 40"
          fill="none"
          stroke="white"
          strokeWidth="0.6"
        >
          <circle cx="20" cy="14" r="1.2" fill="white" />
          <circle cx="14" cy="22" r="1.2" fill="white" />
          <circle cx="26" cy="22" r="1.2" fill="white" />
          <circle cx="20" cy="28" r="1.2" fill="white" />
          <line x1="20" y1="14" x2="14" y2="22" />
          <line x1="20" y1="14" x2="26" y2="22" />
          <line x1="14" y1="22" x2="20" y2="28" />
          <line x1="26" y1="22" x2="20" y2="28" />
        </svg>
      </div>
      {withText && (
        <div className="flex flex-col leading-tight">
          <span className="text-lg font-bold tracking-[0.2em] text-primary">VANGUARD</span>
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
