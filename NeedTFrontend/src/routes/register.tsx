import { RegisterForm } from "@/components/register-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/register")({
  component: RegisterComponent,
});

function RegisterComponent() {
  return (
    <div className="flex items-center justify-center h-screen">
      <RegisterForm />
    </div>
  );
}
