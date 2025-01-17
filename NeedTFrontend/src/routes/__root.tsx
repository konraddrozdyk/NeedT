import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <Link to="/"></Link>
      <Link to="/register"></Link>
      <Outlet />
    </>
  ),
});
