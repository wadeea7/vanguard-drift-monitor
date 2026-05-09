import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { SeverityBadge } from "@/components/SeverityBadge";
import { accuracyTimeline } from "@/lib/mockData";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, ReferenceArea,
  BarChart, Bar, Cell,
} from "recharts";

export const Route = createFileRoute("/monitor")({
  head: () => ({
    meta: [
      { title: "Performance Monitor — VANGUARD" },
      { name: "description", content: "Real-time model performance tracking." },
    ],
  }),
  component: MonitorPage,
});

const confidenceData = [
  { bin: "0-20%", count: 45, color: "#EF4444" },
  { bin: "20-40%", count: 120, color: "#F59E0B" },
  { bin: "40-60%", count: 280, color: "#FBBF24" },
  { bin: "60-80%", count: 420, color: "#84CC16" },
  { bin: "80-100%", count: 380, color: "#10B981" },
];

function MonitorPage() {
  return (
    <AppLayout>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Performance Monitor</h1>
          <p className="text-muted-foreground mt-1 text-sm">Real-time model performance tracking</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="bg-card border border-border rounded-xl px-4 py-2.5 text-sm outline-none">
            <option>Credit Risk Model</option>
          </select>
          <select className="bg-card border border-border rounded-xl px-4 py-2.5 text-sm outline-none">
            <option>Last 24 Hours</option>
          </select>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-success/15 text-success text-xs font-semibold">
            <span className="h-2 w-2 rounded-full bg-success pulse-dot" /> Live
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Current Accuracy", value: "78.5%", sub: "↓ -16.7% from baseline", color: "#EF4444" },
          { label: "Predictions/Hour", value: "1,247", sub: "Steady", color: "#94A3B8" },
          { label: "Avg Confidence", value: "82.3%", sub: "↓ Decreasing", color: "#F59E0B" },
          { label: "Last Updated", value: "30s ago", sub: "Auto-refresh", color: "#94A3B8" },
        ].map((m) => (
          <div key={m.label} className="bg-card border border-border rounded-2xl p-5">
            <p className="text-xs text-muted-foreground">{m.label}</p>
            <p className="text-3xl font-bold mt-2" style={{ color: m.color }}>{m.value}</p>
            <p className="text-xs mt-1" style={{ color: m.color }}>{m.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 mb-6">
        <h3 className="font-semibold mb-4">Accuracy Over Time</h3>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={accuracyTimeline}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="time" stroke="#94A3B8" fontSize={11} />
              <YAxis stroke="#94A3B8" fontSize={11} domain={[60, 100]} />
              <Tooltip contentStyle={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 12 }} />
              <ReferenceArea y1={80} y2={90} fill="#F59E0B" fillOpacity={0.08} />
              <ReferenceArea y1={60} y2={80} fill="#EF4444" fillOpacity={0.08} />
              <ReferenceLine y={95.2} stroke="#10B981" strokeDasharray="5 5" label={{ value: "Baseline 95.2%", fill: "#10B981", fontSize: 11 }} />
              <Line type="monotone" dataKey="accuracy" stroke="#EF4444" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Prediction Confidence Distribution</h3>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={confidenceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="bin" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip contentStyle={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 12 }} />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {confidenceData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Performance Metrics</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-muted-foreground uppercase border-b border-border">
                <th className="text-left pb-2 font-medium">Metric</th>
                <th className="text-left pb-2 font-medium">Current</th>
                <th className="text-left pb-2 font-medium">Baseline</th>
                <th className="text-left pb-2 font-medium">Change</th>
                <th className="text-left pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Accuracy", "78.5%", "95.2%", "-16.7%", "Critical"],
                ["Precision", "81.2%", "93.8%", "-12.6%", "Warning"],
                ["Recall", "76.8%", "91.5%", "-14.7%", "Critical"],
                ["F1 Score", "78.9%", "92.6%", "-13.7%", "Critical"],
              ].map((r) => (
                <tr key={r[0]} className="border-b border-border/40 last:border-0">
                  <td className="py-3 font-medium">{r[0]}</td>
                  <td className="py-3 font-mono">{r[1]}</td>
                  <td className="py-3 font-mono text-muted-foreground">{r[2]}</td>
                  <td className="py-3 text-critical">{r[3]}</td>
                  <td className="py-3"><SeverityBadge severity={r[4] as any} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="font-semibold mb-4">Alert Timeline</h3>
        <div className="space-y-3">
          {[
            { time: "10:24 AM", sev: "Critical", msg: "Accuracy dropped below 80%" },
            { time: "09:15 AM", sev: "Warning", msg: "Confidence variance increased" },
            { time: "06:47 AM", sev: "Critical", msg: "Drift score exceeded threshold" },
          ].map((a, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-background border border-border">
              <span className="text-sm text-muted-foreground font-mono w-20">{a.time}</span>
              <SeverityBadge severity={a.sev as any} />
              <span className="text-sm flex-1">{a.msg}</span>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
