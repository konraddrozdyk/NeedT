import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/register")({
  component: RegisterComponent,
});

function RegisterComponent() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-xs">
        <h2 className="text-xl font-semibold">Registrera dig</h2>
      </div>
    </div>
  );
}
