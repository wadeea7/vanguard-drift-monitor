import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { SeverityBadge } from "@/components/SeverityBadge";
import { Boxes, Plus, Search, TrendingDown, TrendingUp } from "lucide-react";
import { models } from "@/lib/mockData";
import { useState } from "react";

export const Route = createFileRoute("/models")({
  head: () => ({
    meta: [
      { title: "Models — VANGUARD" },
      { name: "description", content: "Manage and monitor your deployed AI models." },
    ],
  }),
  component: ModelsPage,
});

function ModelsPage() {
  const [filter, setFilter] = useState<string>("All");
  const filtered = filter === "All" ? models : models.filter((m) => m.severity === filter);

  return (
    <AppLayout>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Models</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage and monitor your deployed AI models</p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all hover:scale-[1.02]">
          <Plus className="h-4 w-4" /> Add New Model
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-2.5 flex-1 min-w-[240px]">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input placeholder="Search models..." className="bg-transparent outline-none text-sm flex-1" />
        </div>
        <div className="flex gap-2">
          {["All", "Healthy", "Warning", "Critical"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((m) => {
          const trendDown = m.accuracy < 85;
          return (
            <div key={m.id} className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="h-11 w-11 rounded-xl bg-primary/15 flex items-center justify-center">
                  <Boxes className="h-5 w-5 text-primary" />
                </div>
                <SeverityBadge severity={m.severity} />
              </div>
              <h3 className="font-semibold text-lg">{m.modelName}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{m.type}</p>

              <div className="grid grid-cols-3 gap-3 my-5">
                <div>
                  <p className="text-xs text-muted-foreground">Accuracy</p>
                  <p className="font-semibold flex items-center gap-1 mt-1">
                    {m.accuracy.toFixed(1)}%
                    {trendDown ? <TrendingDown className="h-3 w-3 text-critical" /> : <TrendingUp className="h-3 w-3 text-success" />}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Drift</p>
                  <p className={`font-semibold mt-1 ${m.driftScore > 0.7 ? "text-critical" : m.driftScore > 0.5 ? "text-warning" : "text-success"}`}>
                    {m.driftScore.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Checked</p>
                  <p className="font-semibold mt-1 text-xs">{m.lastChecked}</p>
                </div>
              </div>

              <Link
                to="/models/$id" params={{ id: m.id }}
                className="block text-center w-full py-2.5 rounded-xl border border-primary/40 text-primary hover:bg-primary/10 transition-colors text-sm font-semibold"
              >
                View Details
              </Link>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between mt-8 text-sm">
        <p className="text-muted-foreground">Page 1 of 4</p>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-xl bg-card border border-border text-muted-foreground hover:text-foreground">Previous</button>
          <button className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold">Next</button>
        </div>
      </div>
    </AppLayout>
  );
}
