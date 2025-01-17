import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/orderer-dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard"!</div>
}
