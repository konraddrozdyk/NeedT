import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-xs">
          <h2 className="text-xl font-semibold">Välkommen till NeedT</h2>
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
                Logga in
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Inget konto ännu?{" "}
              <Link to="/register" className="text-blue-500 hover:underline">
                Registrera dig
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  ),
});
