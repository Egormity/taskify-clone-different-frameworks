import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_layout-authenticated/_layout-workspaces/workspaces/$workspaceId/_layout-settings/settings/",
)({
	beforeLoad: ({ params }) => redirect({ to: "/workspaces/$workspaceId/settings/members", params }),
});
