import { TransporterDashboard } from "@/components/transporter-dashboard-component";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/transporter-dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <TransporterDashboard />
    </div>
  );
}
