import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { trendsData } from "@/lib/mockData";
import { TrendingDown, Clock, Activity } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  AreaChart, Area,
} from "recharts";

export const Route = createFileRoute("/trends")({
  head: () => ({
    meta: [
      { title: "Performance Trends — VANGUARD" },
      { name: "description", content: "Historical performance analytics and insights." },
    ],
  }),
  component: TrendsPage,
});

const volumeData = trendsData.map((d, i) => ({ date: d.date, volume: 18000 + Math.sin(i / 3) * 4000 + i * 200 }));

function TrendsPage() {
  return (
    <AppLayout>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Performance Trends</h1>
          <p className="text-muted-foreground mt-1 text-sm">Historical performance analytics and insights</p>
        </div>
        <div className="flex gap-3">
          <select className="bg-card border border-border rounded-xl px-4 py-2.5 text-sm outline-none">
            <option>Credit Risk Model</option>
          </select>
          <select className="bg-card border border-border rounded-xl px-4 py-2.5 text-sm outline-none">
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
          </select>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 mb-6">
        <h3 className="font-semibold mb-4">Multi-Metric Trend Analysis</h3>
        <div className="h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" stroke="#94A3B8" fontSize={11} />
              <YAxis stroke="#94A3B8" fontSize={11} domain={[60, 100]} />
              <Tooltip contentStyle={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 12 }} />
              <Legend />
              <Line type="monotone" dataKey="accuracy" stroke="#EF4444" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="precision" stroke="#3B82F6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="recall" stroke="#F59E0B" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="f1" stroke="#10B981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        {[
          { icon: TrendingDown, value: "-2.3%/wk", label: "Degradation Rate", sub: "Average weekly decline", color: "#EF4444" },
          { icon: Clock, value: "14 days", label: "Stable Period", sub: "Longest stable performance", color: "#10B981" },
          { icon: Activity, value: "High (0.73)", label: "Volatility Score", sub: "Performance variability", color: "#F59E0B" },
        ].map((c) => (
          <div key={c.label} className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${c.color}22` }}>
                <c.icon className="h-5 w-5" style={{ color: c.color }} />
              </div>
            </div>
            <p className="text-2xl font-bold" style={{ color: c.color }}>{c.value}</p>
            <p className="text-sm font-medium mt-1">{c.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{c.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Prediction Volume Trends</h3>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={volumeData}>
                <defs>
                  <linearGradient id="vol" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06B6D4" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip contentStyle={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 12 }} />
                <Area type="monotone" dataKey="volume" stroke="#06B6D4" fill="url(#vol)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Drift Timeline</h3>
          <div className="space-y-4 max-h-[260px] overflow-y-auto pr-2">
            {[
              { date: "May 8, 10:24 AM", score: 0.82, sev: "Critical", features: 12 },
              { date: "May 7, 06:30 PM", score: 0.71, sev: "Warning", features: 8 },
              { date: "May 6, 03:15 PM", score: 0.58, sev: "Warning", features: 5 },
              { date: "May 5, 09:00 AM", score: 0.34, sev: "Monitoring", features: 2 },
              { date: "May 3, 11:42 AM", score: 0.28, sev: "Monitoring", features: 1 },
            ].map((e, i) => (
              <div key={i} className="flex gap-3 pb-3 border-b border-border/40 last:border-0">
                <div className="w-1 rounded-full" style={{ backgroundColor: e.sev === "Critical" ? "#EF4444" : e.sev === "Warning" ? "#F59E0B" : "#3B82F6" }} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{e.date}</span>
                    <span className="font-mono font-semibold text-sm">{e.score.toFixed(2)}</span>
                  </div>
                  <p className="text-sm mt-1">{e.features} features affected</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
