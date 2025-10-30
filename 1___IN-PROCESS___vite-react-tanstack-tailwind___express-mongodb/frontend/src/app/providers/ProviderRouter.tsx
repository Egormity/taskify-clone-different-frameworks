import { RouterProvider, createRouter } from "@tanstack/react-router";

import { routeTree } from "../../routeTree.gen";

// Create a new router instance
const router = createRouter({
	routeTree,
	defaultPreload: "intent", // Preload routes on hover
	defaultStaleTime: 5 * 60 * 1000, // 5 minutes
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

// Export the router
const ProviderRouter = () => <RouterProvider router={router} />;
export default ProviderRouter;
