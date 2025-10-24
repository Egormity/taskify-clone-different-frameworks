import { Outlet, createFileRoute } from "@tanstack/react-router";

import { LayoutBoard } from "@widgets/layouts/LayoutBoard";

export const Route = createFileRoute("/_layout-authenticated/_layout-board")({
	component: () => (
		<LayoutBoard>
			<Outlet />
		</LayoutBoard>
	),
});
