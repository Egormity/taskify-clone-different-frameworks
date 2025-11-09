import { Outlet, createFileRoute } from "@tanstack/react-router";

import { LayoutPagesUnauthenticated } from "@/widgets";

export const Route = createFileRoute("/_layout-unauthenticated")({
	component: () => (
		<LayoutPagesUnauthenticated>
			<Outlet />
		</LayoutPagesUnauthenticated>
	),
});
