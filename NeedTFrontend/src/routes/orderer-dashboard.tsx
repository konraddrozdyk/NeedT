import OrderForm from "@/components/orderer-form";
import { createFileRoute } from "@tanstack/react-router";
import { useUser } from "../context/user-context";

export const Route = createFileRoute("/orderer-dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useUser();

  if (!user || user.userRole !== "Orderer") {
    return <div>Not authorized</div>;
  }

  return (
    <div>
      <OrderForm />
    </div>
  );
}
