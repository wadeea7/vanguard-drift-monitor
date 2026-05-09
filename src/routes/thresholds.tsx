import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/thresholds")({
  head: () => ({
    meta: [
      { title: "Configure Thresholds — VANGUARD" },
      { name: "description", content: "Set custom thresholds for drift and performance alerts." },
    ],
  }),
  component: ThresholdsPage,
});

function ThresholdSlider({ label, value, warning, critical, max = 100, suffix = "%" }: any) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold">{label}</label>
        <span className="text-xs text-muted-foreground">Current: <span className="text-critical font-semibold">{value}{suffix}</span></span>
      </div>
      <div className="relative h-2 bg-background rounded-full">
        <div className="absolute h-2 rounded-l-full" style={{ width: `${(critical / max) * 100}%`, backgroundColor: "#EF4444", opacity: 0.4 }} />
        <div className="absolute h-2" style={{ left: `${(critical / max) * 100}%`, width: `${((warning - critical) / max) * 100}%`, backgroundColor: "#F59E0B", opacity: 0.4 }} />
        <div className="absolute h-2 rounded-r-full" style={{ left: `${(warning / max) * 100}%`, width: `${((max - warning) / max) * 100}%`, backgroundColor: "#10B981", opacity: 0.4 }} />
        <div className="absolute -top-1 h-4 w-4 rounded-full bg-critical border-2 border-background" style={{ left: `calc(${(value / max) * 100}% - 8px)` }} />
      </div>
      <div className="flex items-center gap-3 text-xs">
        <div className="flex-1 flex items-center gap-2">
          <span className="text-warning">Warning:</span>
          <input defaultValue={warning} className="w-16 bg-background border border-border rounded px-2 py-1 text-foreground" />
          <span className="text-critical">Critical:</span>
          <input defaultValue={critical} className="w-16 bg-background border border-border rounded px-2 py-1 text-foreground" />
        </div>
      </div>
    </div>
  );
}

function ThresholdsPage() {
  const [saved, setSaved] = useState(false);

  return (
    <AppLayout>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Configure Alert Thresholds</h1>
          <p className="text-muted-foreground mt-1 text-sm">Set custom thresholds for drift and performance alerts</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="bg-card border border-border rounded-xl px-4 py-2.5 text-sm outline-none">
            <option>Credit Risk Model</option>
          </select>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="accent-primary" /> Apply to all
          </label>
        </div>
      </div>

      {saved && (
        <div className="bg-success/15 border border-success/40 text-success rounded-xl px-4 py-3 mb-6 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" /> Threshold configuration saved successfully
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
          <h3 className="font-semibold">Performance Thresholds</h3>
          <ThresholdSlider label="Accuracy Threshold" value={78.5} warning={85} critical={75} />
          <ThresholdSlider label="Precision Threshold" value={81.2} warning={80} critical={70} />
          <ThresholdSlider label="Recall Threshold" value={76.8} warning={80} critical={70} />
          <ThresholdSlider label="F1 Score Threshold" value={78.9} warning={82} critical={72} />
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
          <h3 className="font-semibold">Drift Thresholds</h3>
          <ThresholdSlider label="Data Drift Score" value={0.82} warning={0.5} critical={0.7} max={1} suffix="" />
          <ThresholdSlider label="Concept Drift Score" value={0.65} warning={0.6} critical={0.8} max={1} suffix="" />
          <div>
            <label className="text-sm font-semibold">Feature Drift Count</label>
            <p className="text-xs text-muted-foreground mt-1 mb-2">Alert when N features exceed threshold</p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-warning">Warning</span>
                <input defaultValue={5} className="mt-1 w-full bg-background border border-border rounded-xl px-3 py-2" />
              </div>
              <div>
                <span className="text-critical">Critical</span>
                <input defaultValue={10} className="mt-1 w-full bg-background border border-border rounded-xl px-3 py-2" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 mb-6">
        <h3 className="font-semibold mb-5">Alert Behavior</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Alert Frequency</label>
            <select className="mt-2 w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm">
              <option>Immediate</option><option>Every Hour</option><option>Daily Summary</option>
            </select>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-5 block">Email Recipients</label>
            <input defaultValue="alerts@company.com" className="mt-2 w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm" />
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Notification Channels</p>
            {[
              ["Email notifications", true],
              ["In-app alerts", true],
              ["Slack integration", false],
              ["SMS alerts", false],
            ].map(([l, c]: any) => (
              <label key={l} className="flex items-center gap-3 text-sm">
                <input type="checkbox" defaultChecked={c} className="accent-primary h-4 w-4" /> {l}
              </label>
            ))}
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-5">Auto-Actions</p>
            <label className="flex items-center gap-3 text-sm"><input type="checkbox" defaultChecked className="accent-primary h-4 w-4" /> Auto-pause model when critical</label>
            <label className="flex items-center gap-3 text-sm"><input type="checkbox" className="accent-primary h-4 w-4" /> Trigger retraining pipeline</label>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 mb-6">
        <h3 className="font-semibold mb-4">Threshold Preview</h3>
        <div className="h-12 rounded-xl flex overflow-hidden">
          <div className="flex-1 bg-success/30 flex items-center justify-center text-xs font-semibold text-success">Healthy</div>
          <div className="flex-1 bg-warning/30 flex items-center justify-center text-xs font-semibold text-warning">Warning</div>
          <div className="flex-1 bg-critical/30 flex items-center justify-center text-xs font-semibold text-critical">Critical (current)</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={() => setSaved(true)} className="bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl glow-cyan">Save Thresholds</button>
        <button className="border border-border px-6 py-3 rounded-xl text-sm">Reset to Defaults</button>
        <button className="border border-border px-6 py-3 rounded-xl text-sm">Test Alerts</button>
      </div>
    </AppLayout>
  );
}
