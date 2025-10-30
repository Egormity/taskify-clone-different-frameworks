import { Outlet, createFileRoute } from "@tanstack/react-router";

import ProviderAuth from "@app/providers/ProviderAuth";

import { LayoutPagesAuthenticated } from "@widgets/layouts/LayoutPagesAuthenticated";

export const Route = createFileRoute("/_layout-authenticated")({
	component: () => (
		<LayoutPagesAuthenticated>
			<ProviderAuth />
			<Outlet />
		</LayoutPagesAuthenticated>
	),
});
