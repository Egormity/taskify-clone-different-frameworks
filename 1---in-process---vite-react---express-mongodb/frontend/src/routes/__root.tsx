import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { ProviderUser } from "@/providers";

export const Route = createRootRoute({
	component: () => (
		<>
			<ProviderUser />
			<Outlet />
			<TanStackRouterDevtools />
		</>
	),
});
