import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout-authenticated/_layout-workspaces/workspaces/$workspaceId/")({
	beforeLoad: ({ params }) => redirect({ to: `/workspaces/$workspaceId/boards`, params }),
});
