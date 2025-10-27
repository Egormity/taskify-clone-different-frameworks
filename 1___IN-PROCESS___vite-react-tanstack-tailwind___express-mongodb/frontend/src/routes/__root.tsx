import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { ProviderAuth } from "@app/providers/ProviderAuth";

export const Route = createRootRoute({
	component: () => (
		<ProviderAuth>
			<Outlet />
			<TanStackRouterDevtools />
		</ProviderAuth>
	),
});
