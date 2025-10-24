import { Outlet, createFileRoute } from "@tanstack/react-router";

import { LayoutWorkspaces } from "@widgets/layouts/LayoutWorkspaces";

export const Route = createFileRoute("/_layout-authenticated/_layout-workspaces")({
	component: () => (
		<LayoutWorkspaces>
			<Outlet />
		</LayoutWorkspaces>
	),
});
