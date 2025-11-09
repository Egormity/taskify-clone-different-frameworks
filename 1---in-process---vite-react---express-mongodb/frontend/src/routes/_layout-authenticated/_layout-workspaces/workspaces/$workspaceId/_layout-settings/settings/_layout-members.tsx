import { Outlet, createFileRoute } from "@tanstack/react-router";

import { LayoutPagesWorkplaceSettingsMembers } from "@/widgets";

export const Route = createFileRoute(
	"/_layout-authenticated/_layout-workspaces/workspaces/$workspaceId/_layout-settings/settings/_layout-members",
)({
	component: () => (
		<LayoutPagesWorkplaceSettingsMembers>
			<Outlet />
		</LayoutPagesWorkplaceSettingsMembers>
	),
});
