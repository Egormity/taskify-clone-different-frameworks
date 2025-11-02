import { Outlet, createFileRoute } from "@tanstack/react-router";

import { LayoutPagesWorkspaceSettings } from "@/widgets";

export const Route = createFileRoute(
	"/_layout-authenticated/_layout-workspaces/workspaces/$workspaceId/_layout-settings",
)({
	component: () => (
		<LayoutPagesWorkspaceSettings>
			<Outlet />
		</LayoutPagesWorkspaceSettings>
	),
});
