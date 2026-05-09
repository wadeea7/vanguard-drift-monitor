import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { SeverityBadge } from "@/components/SeverityBadge";
import {
  Boxes, CheckCircle2, AlertTriangle, AlertOctagon, ArrowUp, ArrowRight,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { healthTrend, driftAlerts, riskDistribution } from "@/lib/mockData";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — VANGUARD" },
      { name: "description", content: "Real-time overview of your AI models and risk posture." },
    ],
  }),
  component: Dashboard,
});

function MetricCard({ icon: Icon, value, label, sub, color }: any) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="h-11 w-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}22` }}>
          <Icon className="h-5 w-5" style={{ color }} />
        </div>
      </div>
      <p className="text-4xl font-bold" style={{ color }}>{value}</p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
      <p className="text-xs mt-3 flex items-center gap-1" style={{ color }}>
        <ArrowUp className="h-3 w-3" /> {sub}
      </p>
    </div>
  );
}

function Dashboard() {
  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1 text-sm">Real-time overview of your AI models and risk posture</p>
        </div>
        <div className="bg-card border border-border rounded-xl px-4 py-2.5 text-sm text-muted-foreground">
          May 2 - May 8, 2026
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <MetricCard icon={Boxes} value="24" label="Monitored Models" sub="+2 this week" color="#06B6D4" />
        <MetricCard icon={CheckCircle2} value="16" label="Healthy Models" sub="66.7%" color="#10B981" />
        <MetricCard icon={AlertTriangle} value="5" label="At Risk Models" sub="20.8%" color="#F59E0B" />
        <MetricCard icon={AlertOctagon} value="3" label="Critical Models" sub="12.5%" color="#EF4444" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold mb-1">Model Health Overview</h3>
            <p className="text-xs text-muted-foreground mb-4">7-day trend by status</p>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={healthTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="day" stroke="#94A3B8" fontSize={12} />
                  <YAxis stroke="#94A3B8" fontSize={12} domain={[0, 25]} />
                  <Tooltip contentStyle={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 12 }} />
                  <Line type="monotone" dataKey="healthy" stroke="#10B981" strokeWidth={2.5} dot={{ r: 4 }} name="Healthy" />
                  <Line type="monotone" dataKey="atRisk" stroke="#F59E0B" strokeWidth={2.5} dot={{ r: 4 }} name="At Risk" />
                  <Line type="monotone" dataKey="critical" stroke="#EF4444" strokeWidth={2.5} dot={{ r: 4 }} name="Critical" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-6 text-xs text-muted-foreground mt-2">
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-success" /> Healthy</span>
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-warning" /> At Risk</span>
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-critical" /> Critical</span>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Top Drift Alerts</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-muted-foreground uppercase tracking-wider border-b border-border">
                    <th className="text-left font-medium pb-3">Model Name</th>
                    <th className="text-left font-medium pb-3">Drift Score</th>
                    <th className="text-left font-medium pb-3">Severity</th>
                    <th className="text-left font-medium pb-3">Detected At</th>
                  </tr>
                </thead>
                <tbody>
                  {driftAlerts.map((a) => (
                    <tr key={a.modelName} className="border-b border-border/50 last:border-0">
                      <td className="py-3 font-medium">{a.modelName}</td>
                      <td className="py-3 font-mono">{a.driftScore.toFixed(2)}</td>
                      <td className="py-3"><SeverityBadge severity={a.severity} /></td>
                      <td className="py-3 text-muted-foreground">{a.detectedAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Link to="/alerts" className="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline">
              View all alerts <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Risk Score Distribution</h3>
            <div className="h-[200px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={riskDistribution} dataKey="value" innerRadius={55} outerRadius={80} paddingAngle={3}>
                    {riskDistribution.map((d) => <Cell key={d.name} fill={d.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold">24</span>
                <span className="text-xs text-muted-foreground">Total</span>
              </div>
            </div>
            <div className="space-y-2 mt-4">
              {riskDistribution.map((d) => (
                <div key={d.name} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: d.color }} />
                    {d.name}
                  </span>
                  <span className="text-muted-foreground">{d.value} ({((d.value / 24) * 100).toFixed(1)}%)</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { color: "#EF4444", text: "Drift alert triggered for Credit Risk Model", time: "10:24 AM" },
                { color: "#F59E0B", text: "Bias score increased in Churn Model", time: "09:15 AM" },
                { color: "#3B82F6", text: "Performance degraded in Fraud Detection", time: "06:47 AM" },
              ].map((a, i) => (
                <div key={i} className="flex gap-3">
                  <div className="mt-1.5 h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: a.color }} />
                  <div className="flex-1">
                    <p className="text-sm">{a.text}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/alerts" className="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline">
              View all activity <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
