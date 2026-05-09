import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/baseline")({
  head: () => ({
    meta: [
      { title: "Set Baseline — VANGUARD" },
      { name: "description", content: "Configure baseline performance metrics for monitoring." },
    ],
  }),
  component: BaselinePage,
});

const Field = ({ label, value, current }: { label: string; value: string; current: string }) => (
  <div>
    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</label>
    <div className="flex items-center gap-3 mt-2">
      <input defaultValue={value} className="flex-1 bg-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary" />
      <span className="text-xs text-muted-foreground whitespace-nowrap">Current: <span className="text-foreground">{current}</span></span>
    </div>
  </div>
);

function BaselinePage() {
  const [saved, setSaved] = useState(false);

  return (
    <AppLayout>
      <p className="text-xs text-muted-foreground mb-2">Dashboard / Models / Credit Risk Model / Set Baseline</p>
      <h1 className="text-3xl font-bold">Set Baseline Metrics</h1>
      <p className="text-muted-foreground mt-1 text-sm mb-6">Configure baseline performance metrics for monitoring</p>

      {saved && (
        <div className="bg-success/15 border border-success/40 text-success rounded-xl px-4 py-3 mb-6 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" /> Baseline metrics successfully saved
        </div>
      )}

      <div className="bg-card border border-border rounded-2xl p-6 mb-6">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Select Model</label>
        <select className="mt-2 w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none">
          <option>Credit Risk Model</option>
          <option>Customer Churn Model</option>
          <option>Fraud Detection Model</option>
        </select>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 mb-6">
        <h3 className="font-semibold mb-5">Performance Metrics</h3>
        <div className="grid md:grid-cols-2 gap-5">
          <Field label="Accuracy Baseline (%)" value="95.2" current="95.2%" />
          <Field label="Precision Baseline (%)" value="93.8" current="93.8%" />
          <Field label="Recall Baseline (%)" value="91.5" current="91.5%" />
          <Field label="F1 Score Baseline (%)" value="92.6" current="92.6%" />
        </div>
        <button className="mt-5 px-4 py-2 rounded-xl bg-accent text-sm">Use Current Performance</button>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 mb-6">
        <h3 className="font-semibold mb-5">Statistical Baseline</h3>
        <div className="grid md:grid-cols-2 gap-5">
          <Field label="Mean Prediction Value" value="0.652" current="0.652" />
          <Field label="Standard Deviation" value="0.142" current="0.142" />
        </div>
        <div className="mt-5 flex items-end gap-3 h-20 bg-background rounded-xl p-3">
          {[20, 35, 60, 85, 70, 50, 30, 15].map((h, i) => (
            <div key={i} className="flex-1 bg-primary/60 rounded-t" style={{ height: `${h}%` }} />
          ))}
        </div>
        <button className="mt-5 px-4 py-2 rounded-xl bg-accent text-sm">Calculate from Data</button>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 mb-6">
        <h3 className="font-semibold mb-5">Data Characteristics</h3>
        <div className="grid md:grid-cols-3 gap-5">
          <Field label="Feature Count" value="47" current="47" />
          <Field label="Sample Size" value="125000" current="125,000" />
          <Field label="Data Version" value="v2.3.1" current="v2.3.1" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={() => setSaved(true)} className="bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl glow-cyan">Save Baseline</button>
        <button className="border border-border px-6 py-3 rounded-xl text-sm">Reset to Default</button>
        <button className="text-muted-foreground px-6 py-3 text-sm">Cancel</button>
      </div>
    </AppLayout>
  );
}
