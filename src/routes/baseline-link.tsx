import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";

export const Route = createFileRoute("/baseline-link")({
  component: () => (
    <AppLayout>
      <Link to="/baseline" className="text-primary">Set Baseline</Link>
    </AppLayout>
  ),
});
