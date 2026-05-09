import { Severity } from "@/lib/mockData";

export function SeverityBadge({ severity, large = false }: { severity: Severity; large?: boolean }) {
  const map: Record<Severity, { bg: string; text: string }> = {
    Healthy: { bg: "rgba(16,185,129,0.15)", text: "#10B981" },
    Warning: { bg: "rgba(245,158,11,0.15)", text: "#F59E0B" },
    Critical: { bg: "rgba(239,68,68,0.15)", text: "#EF4444" },
    Monitoring: { bg: "rgba(59,130,246,0.15)", text: "#3B82F6" },
  };
  const { bg, text } = map[severity];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${
        large ? "px-3 py-1.5 text-sm" : "px-2.5 py-1 text-xs"
      }`}
      style={{ backgroundColor: bg, color: text }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: text }} />
      {severity}
    </span>
  );
}
