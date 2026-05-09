import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard, Boxes, Activity, AlertTriangle, FileText,
  ShieldCheck, Settings, LogOut, Bell, Search,
} from "lucide-react";
import { VanguardLogo } from "./VanguardLogo";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/models", label: "Models", icon: Boxes },
  { to: "/monitor", label: "Monitoring", icon: Activity },
  { to: "/alerts", label: "Drift Alerts", icon: AlertTriangle },
  { to: "/trends", label: "Reports", icon: FileText },
  { to: "/drift", label: "Compliance", icon: ShieldCheck },
  { to: "/thresholds", label: "Settings", icon: Settings },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <aside className="hidden md:flex w-[280px] shrink-0 flex-col border-r border-border bg-sidebar">
        <div className="px-6 py-6 border-b border-border">
          <Link to="/dashboard">
            <VanguardLogo size={48} tagline />
          </Link>
        </div>
        <nav className="flex-1 px-3 py-6 space-y-1">
          {nav.map((item) => {
            const active = path === item.to || (item.to === "/models" && path.startsWith("/models"));
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? "bg-primary/15 text-primary border border-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-2 py-2 rounded-xl">
            <div className="h-10 w-10 rounded-full gradient-brand flex items-center justify-center text-white font-semibold text-sm">
              AU
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">Admin User</p>
              <p className="text-xs text-muted-foreground truncate">admin@vanguard.ai</p>
            </div>
            <button
              onClick={() => navigate({ to: "/" })}
              className="text-muted-foreground hover:text-critical transition-colors p-2 rounded-lg hover:bg-accent"
              aria-label="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-card/40 backdrop-blur flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search models, alerts, reports..."
              className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-success pulse-dot" />
              Live
            </div>
            <button className="relative p-2 rounded-xl hover:bg-accent transition-colors" aria-label="Notifications">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-critical" />
            </button>
          </div>
        </header>
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
