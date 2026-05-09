import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { SeverityBadge } from "@/components/SeverityBadge";
import { AlertTriangle, Download } from "lucide-react";
import { featureDrift, distributionBaseline, distributionCurrent } from "@/lib/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";

export const Route = createFileRoute("/drift")({
  head: () => ({
    meta: [
      { title: "Data Drift — VANGUARD" },
      { name: "description", content: "Monitor changes in input data distribution." },
    ],
  }),
  component: DriftPage,
});

function DriftPage() {
  const [tab, setTab] = useState("KS Test");

  return (
    <AppLayout>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Data Drift Detection</h1>
          <p className="text-muted-foreground mt-1 text-sm">Monitor changes in input data distribution</p>
        </div>
        <select className="bg-card border border-border rounded-xl px-4 py-2.5 text-sm outline-none">
          <option>Credit Risk Model</option>
        </select>
      </div>

      <div className="flex gap-2 mb-6">
        {["KS Test", "PSI", "Chi-Square"].map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-sm font-medium ${tab === t ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground"}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="bg-critical/15 border border-critical/40 rounded-2xl p-5 mb-6 flex items-center gap-4">
        <AlertTriangle className="h-6 w-6 text-critical shrink-0" />
        <div className="flex-1">
          <p className="font-semibold text-critical">CRITICAL: Significant data drift detected in 12 features</p>
          <p className="text-xs text-muted-foreground mt-1">Detected at: May 8, 2026 10:24 AM</p>
        </div>
        <button className="bg-critical text-white font-semibold px-4 py-2 rounded-xl text-sm">View Details</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-card border border-border rounded-2xl p-6 flex flex-col items-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Overall Drift Score</p>
          <div className="relative my-4">
            <svg width="180" height="180" viewBox="0 0 180 180">
              <circle cx="90" cy="90" r="75" stroke="#334155" strokeWidth="14" fill="none" />
              <circle cx="90" cy="90" r="75" stroke="#EF4444" strokeWidth="14" fill="none"
                strokeDasharray={`${0.82 * 471} 999`} strokeLinecap="round"
                transform="rotate(-90 90 90)" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-critical">0.82</span>
              <span className="text-xs text-muted-foreground mt-1">/ 1.00</span>
            </div>
          </div>
          <SeverityBadge severity="Critical" large />
        </div>

        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Statistical Test Results</h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-background rounded-xl p-4">
              <p className="text-xs text-muted-foreground">KS Statistic</p>
              <p className="text-2xl font-bold mt-1">0.247</p>
            </div>
            <div className="bg-background rounded-xl p-4">
              <p className="text-xs text-muted-foreground">P-Value</p>
              <p className="text-2xl font-bold mt-1 text-critical">0.001</p>
            </div>
            <div className="bg-background rounded-xl p-4">
              <p className="text-xs text-muted-foreground">PSI Score</p>
              <p className="text-2xl font-bold mt-1 text-critical">0.82</p>
            </div>
          </div>
          <div className="bg-critical/10 border border-critical/30 rounded-xl p-4 text-sm">
            <span className="font-semibold text-critical">Interpretation:</span>{" "}
            <span className="text-muted-foreground">Significant drift detected. Recommend retraining.</span>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Feature Drift Analysis</h3>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm">
            <Download className="h-4 w-4" /> Download Report
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-muted-foreground uppercase border-b border-border">
                <th className="text-left pb-3 font-medium">Feature</th>
                <th className="text-left pb-3 font-medium">Baseline Mean</th>
                <th className="text-left pb-3 font-medium">Current Mean</th>
                <th className="text-left pb-3 font-medium">Drift Score</th>
                <th className="text-left pb-3 font-medium">Change</th>
                <th className="text-left pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {featureDrift.map((f) => (
                <tr key={f.feature} className="border-b border-border/40 last:border-0">
                  <td className="py-3 font-mono font-medium">{f.feature}</td>
                  <td className="py-3 font-mono text-muted-foreground">{f.baseline.toLocaleString()}</td>
                  <td className="py-3 font-mono">{f.current.toLocaleString()}</td>
                  <td className="py-3 font-mono font-semibold">{f.driftScore.toFixed(2)}</td>
                  <td className={`py-3 ${f.change < 0 ? "text-critical" : "text-warning"}`}>{f.change > 0 ? "+" : ""}{f.change.toFixed(1)}%</td>
                  <td className="py-3"><SeverityBadge severity={f.severity} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Baseline Distribution</h3>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distributionBaseline}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="bin" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip contentStyle={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 12 }} />
                <Bar dataKey="count" fill="#06B6D4" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Current Distribution</h3>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distributionCurrent}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="bin" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip contentStyle={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 12 }} />
                <Bar dataKey="count" fill="#EF4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
