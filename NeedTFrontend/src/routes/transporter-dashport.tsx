import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/transporter-dashport')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/transporter-dashport"!</div>
}
