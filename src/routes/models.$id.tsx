import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { SeverityBadge } from "@/components/SeverityBadge";
import { ArrowLeft, RefreshCw, Activity } from "lucide-react";
import { models, accuracyTimeline } from "@/lib/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

export const Route = createFileRoute("/models/$id")({
  head: () => ({
    meta: [
      { title: "Model Detail — VANGUARD" },
      { name: "description", content: "Detailed view of model performance, drift and health." },
    ],
  }),
  component: ModelDetail,
});

function ModelDetail() {
  const { id } = Route.useParams();
  const model = models.find((m) => m.id === id) ?? models[0];

  return (
    <AppLayout>
      <Link to="/models" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4">
        <ArrowLeft className="h-4 w-4" /> Back to Models
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">{model.modelName}</h1>
          <SeverityBadge severity={model.severity} large />
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <RefreshCw className="h-4 w-4" /> Updated 2 minutes ago
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Model Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            {[
              ["Type", model.type], ["Version", "v2.3.1"], ["Deployed", "April 15, 2026"],
              ["Framework", "scikit-learn"], ["Owner", "Data Science Team"], ["Predictions Today", "24,567"],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="text-xs text-muted-foreground">{k}</p>
                <p className="font-semibold mt-1">{v}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 flex flex-col items-center justify-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Health Score</p>
          <div className="relative my-3">
            <svg width="140" height="140" viewBox="0 0 140 140">
              <circle cx="70" cy="70" r="60" stroke="#334155" strokeWidth="10" fill="none" />
              <circle cx="70" cy="70" r="60" stroke="#EF4444" strokeWidth="10" fill="none"
                strokeDasharray={`${42 * 3.77} 999`} strokeLinecap="round"
                transform="rotate(-90 70 70)" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-critical">42</span>
              <span className="text-xs text-muted-foreground">/ 100</span>
            </div>
          </div>
          <p className="text-xs text-critical">↓ 18 points</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {[
          { label: "Accuracy", value: "78.5%", change: "-16.7%", color: "#EF4444" },
          { label: "Drift Score", value: "0.82", change: "Critical", color: "#EF4444" },
          { label: "Predictions", value: "24,567", change: "Today", color: "#94A3B8" },
          { label: "Precision", value: "81.2%", change: "-12.6%", color: "#F59E0B" },
          { label: "Recall", value: "76.8%", change: "-14.7%", color: "#EF4444" },
          { label: "F1 Score", value: "78.9%", change: "-13.7%", color: "#EF4444" },
        ].map((m) => (
          <div key={m.label} className="bg-card border border-border rounded-2xl p-4">
            <p className="text-xs text-muted-foreground">{m.label}</p>
            <p className="text-xl font-bold mt-1" style={{ color: m.color }}>{m.value}</p>
            <p className="text-xs mt-1" style={{ color: m.color }}>{m.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Performance Timeline (Last 7 days)</h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={accuracyTimeline.slice(0, 14)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="time" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} domain={[60, 100]} />
                <Tooltip contentStyle={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 12 }} />
                <ReferenceLine y={95.2} stroke="#10B981" strokeDasharray="5 5" label={{ value: "Baseline", fill: "#10B981", fontSize: 10 }} />
                <Line type="monotone" dataKey="accuracy" stroke="#EF4444" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold text-critical mb-3">Critical Issues</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2"><span>🔴</span><div><p>Significant data drift detected</p><p className="text-xs text-muted-foreground">May 8, 10:24 AM</p></div></li>
              <li className="flex gap-2"><span>🔴</span><div><p>Accuracy below critical threshold</p><p className="text-xs text-muted-foreground">May 8, 08:15 AM</p></div></li>
              <li className="flex gap-2"><span>🟠</span><div><p>12 features showing drift</p><p className="text-xs text-muted-foreground">May 7, 11:30 PM</p></div></li>
            </ul>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6 space-y-2">
            <h3 className="font-semibold mb-3">Quick Actions</h3>
            <button className="w-full bg-primary text-primary-foreground font-semibold py-2.5 rounded-xl">View Detailed Report</button>
            <button className="w-full border border-border py-2.5 rounded-xl text-sm">Configure Alerts</button>
            <button className="w-full bg-warning/15 text-warning font-semibold py-2.5 rounded-xl">Retrain Model</button>
            <button className="w-full border border-critical/40 text-critical py-2.5 rounded-xl text-sm">Pause Model</button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
