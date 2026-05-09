import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { SeverityBadge } from "@/components/SeverityBadge";
import { AlertCircle, Eye, CheckCircle2, Clock, X } from "lucide-react";
import { alertsList } from "@/lib/mockData";
import { useState } from "react";

export const Route = createFileRoute("/alerts")({
  head: () => ({
    meta: [
      { title: "Drift Alerts — VANGUARD" },
      { name: "description", content: "Monitor and manage drift detection alerts." },
    ],
  }),
  component: AlertsPage,
});

function AlertsPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const alert = alertsList.find((a) => a.id === selected);

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Drift Alerts</h1>
        <p className="text-muted-foreground mt-1 text-sm">Monitor and manage drift detection alerts</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { icon: AlertCircle, value: "8", label: "Active Alerts", color: "#EF4444" },
          { icon: Eye, value: "5", label: "Acknowledged", color: "#F59E0B" },
          { icon: CheckCircle2, value: "12", label: "Resolved Today", color: "#10B981" },
          { icon: Clock, value: "2.4 hrs", label: "Avg Response Time", color: "#94A3B8" },
        ].map((c) => (
          <div key={c.label} className="bg-card border border-border rounded-2xl p-5">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${c.color}22` }}>
              <c.icon className="h-5 w-5" style={{ color: c.color }} />
            </div>
            <p className="text-3xl font-bold" style={{ color: c.color }}>{c.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        {["All", "Critical", "Warning", "Monitoring"].map((f) => (
          <button key={f} className="px-4 py-2 rounded-xl bg-card border border-border text-sm">
            {f}
          </button>
        ))}
        <input placeholder="Search alerts..." className="ml-auto bg-card border border-border rounded-xl px-4 py-2 text-sm outline-none flex-1 min-w-[200px] max-w-xs" />
      </div>

      <div className={`grid gap-6 ${selected ? "lg:grid-cols-3" : ""}`}>
        <div className={`${selected ? "lg:col-span-2" : ""} bg-card border border-border rounded-2xl overflow-hidden`}>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-muted-foreground uppercase border-b border-border bg-background/50">
                <th className="text-left px-4 py-3 font-medium">Severity</th>
                <th className="text-left px-4 py-3 font-medium">Type</th>
                <th className="text-left px-4 py-3 font-medium">Model</th>
                <th className="text-left px-4 py-3 font-medium">Detected</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-left px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {alertsList.map((a) => (
                <tr key={a.id} className="border-b border-border/40 last:border-0 hover:bg-background/40 transition-colors"
                  style={{ borderLeft: `3px solid ${a.severity === "Critical" ? "#EF4444" : a.severity === "Warning" ? "#F59E0B" : a.severity === "Monitoring" ? "#3B82F6" : "#10B981"}` }}>
                  <td className="px-4 py-3"><SeverityBadge severity={a.severity} /></td>
                  <td className="px-4 py-3 font-medium">{a.type}</td>
                  <td className="px-4 py-3">{a.modelName}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{a.detectedAt}</td>
                  <td className="px-4 py-3 text-xs">{a.status}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => setSelected(a.id)} className="text-primary text-xs font-semibold hover:underline">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-4 py-3 flex items-center justify-between text-xs text-muted-foreground border-t border-border">
            <span>Showing 1-5 of 47 alerts</span>
            <div className="flex gap-1">
              {["Prev", "1", "2", "3", "4", "5", "Next"].map((p) => (
                <button key={p} className={`px-3 py-1 rounded-lg ${p === "1" ? "bg-primary text-primary-foreground font-semibold" : "border border-border"}`}>{p}</button>
              ))}
            </div>
          </div>
        </div>

        {selected && alert && (
          <div className="bg-card border border-border rounded-2xl p-6 space-y-4 h-fit">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">{alert.id}</p>
                <SeverityBadge severity={alert.severity} large />
              </div>
              <button onClick={() => setSelected(null)} className="p-2 hover:bg-accent rounded-lg" aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div><p className="text-xs text-muted-foreground">Model</p><p className="font-semibold">{alert.modelName}</p></div>
              <div><p className="text-xs text-muted-foreground">Type</p><p className="font-semibold">{alert.type}</p></div>
              <div><p className="text-xs text-muted-foreground">Detected</p><p className="font-semibold">{alert.detectedAt}</p></div>
              <div><p className="text-xs text-muted-foreground">Message</p><p>{alert.message}</p></div>
            </div>
            <div className="border-t border-border pt-4">
              <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">Recommended Actions</p>
              <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                <li>Review feature distributions</li>
                <li>Consider model retraining</li>
                <li>Check data pipeline for issues</li>
              </ul>
            </div>
            <div className="space-y-2 pt-2">
              <button className="w-full bg-warning text-white font-semibold py-2.5 rounded-xl text-sm">Acknowledge Alert</button>
              <button className="w-full bg-success text-white font-semibold py-2.5 rounded-xl text-sm">Resolve Alert</button>
              <button className="w-full border border-border py-2.5 rounded-xl text-sm">Snooze 1 hour</button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
