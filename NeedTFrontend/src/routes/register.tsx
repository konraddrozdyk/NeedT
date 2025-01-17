import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/register")({
  component: RegisterComponent,
});

function RegisterComponent() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-xs">
        <h2 className="text-xl font-semibold">Registrera dig</h2>
        <form className="mt-4">
          <input
            type="text"
            placeholder="Användarnamn"
            className="border border-gray-300 p-2 rounded w-full"
          />
          <div className="mt-4">
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded w-full"
            >
              Registrera
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm">
          Har du redan ett konto?{" "}
          <a href="/" className="text-blue-500 hover:underline">
            Logga in här
          </a>
        </p>
      </div>
    </div>
  );
}
