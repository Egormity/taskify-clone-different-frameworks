import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ProviderMuiTheme } from "@app/providers/ProviderMuiTheme";
import { ProviderQueryClient } from "@app/providers/ProviderQueryClient";

import "./index.css";
import { routeTree } from "./routeTree.gen";

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

// Render the application
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ProviderQueryClient>
			<ProviderMuiTheme>
				<RouterProvider router={router} />
			</ProviderMuiTheme>
		</ProviderQueryClient>
	</StrictMode>,
);
