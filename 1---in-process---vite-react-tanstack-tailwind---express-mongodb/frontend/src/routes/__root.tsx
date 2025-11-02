import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { ProviderAuth } from "@/providers";

export const Route = createRootRoute({
	component: () => (
		<>
			<ProviderAuth />
			<Outlet />
			<TanStackRouterDevtools />
		</>
	),
});
