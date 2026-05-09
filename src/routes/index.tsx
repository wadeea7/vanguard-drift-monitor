import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Mail, Lock } from "lucide-react";
import { useState } from "react";
import { VanguardLogo } from "@/components/VanguardLogo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Login — VANGUARD AI Monitor" },
      { name: "description", content: "Sign in to VANGUARD continuous drift & performance monitor." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@vanguard.ai");
  const [password, setPassword] = useState("••••••••");

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <div className="relative w-full max-w-[450px] bg-card border border-border rounded-2xl p-10 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="mb-4">
            <VanguardLogo size={80} withText={false} />
          </div>
          <h1 className="text-3xl font-bold tracking-[0.25em] text-primary">VANGUARD</h1>
          <p className="text-sm text-muted-foreground mt-2">Continuous Drift & Performance Monitor</p>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); navigate({ to: "/dashboard" }); }}
          className="space-y-4"
        >
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</label>
            <div className="mt-2 flex items-center gap-3 bg-background border border-border rounded-xl px-4 py-3 focus-within:border-primary transition-colors">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm"
                placeholder="you@company.com"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Password</label>
            <div className="mt-2 flex items-center gap-3 bg-background border border-border rounded-xl px-4 py-3 focus-within:border-primary transition-colors">
              <Lock className="h-4 w-4 text-muted-foreground" />
              <input
                type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm pt-1">
            <label className="flex items-center gap-2 text-muted-foreground cursor-pointer">
              <input type="checkbox" defaultChecked className="accent-primary" />
              Remember me
            </label>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3.5 rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99] glow-cyan"
          >
            Login
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-6">
          AI Governance & Risk Management · Enterprise Edition
        </p>
      </div>
    </div>
  );
}
