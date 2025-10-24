import { createFileRoute } from "@tanstack/react-router";

import { PageHello } from "@pages/PageHello";

export const Route = createFileRoute("/_layout-unauthenticated/hello")({
	component: PageHello,
});
