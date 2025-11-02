import { Outlet, createFileRoute } from "@tanstack/react-router";

import { LayoutPagesWorkspaces } from "@/widgets";

export const Route = createFileRoute("/_layout-authenticated/_layout-workspaces")({
	component: () => (
		<LayoutPagesWorkspaces>
			<Outlet />
		</LayoutPagesWorkspaces>
	),
});
