import { Outlet, createFileRoute } from "@tanstack/react-router";

import { LayoutPagesUnauthenticated } from "@widgets/layouts/LayoutPagesUnauthenticated";

export const Route = createFileRoute("/_layout-unauthenticated")({
	component: () => (
		<LayoutPagesUnauthenticated>
			<Outlet />
		</LayoutPagesUnauthenticated>
	),
});
