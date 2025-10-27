import { Outlet, createFileRoute } from "@tanstack/react-router";

import { LayoutPagesWorkspaces } from "@widgets/layouts/LayoutPagesWorkspaces";

export const Route = createFileRoute("/_layout-authenticated/_layout-workspaces")({
	component: () => (
		<LayoutPagesWorkspaces>
			<Outlet />
		</LayoutPagesWorkspaces>
	),
});
