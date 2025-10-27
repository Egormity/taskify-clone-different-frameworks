import { Outlet, createFileRoute } from "@tanstack/react-router";

import { LayoutPagesAuthenticated } from "@widgets/layouts/LayoutPagesAuthenticated";

export const Route = createFileRoute("/_layout-authenticated")({
	component: () => (
		<LayoutPagesAuthenticated>
			<Outlet />
		</LayoutPagesAuthenticated>
	),
});
