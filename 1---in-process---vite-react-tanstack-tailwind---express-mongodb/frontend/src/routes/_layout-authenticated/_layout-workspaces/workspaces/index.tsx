import { createFileRoute } from "@tanstack/react-router";

import { PageEmpty } from "@/pages";

export const Route = createFileRoute("/_layout-authenticated/_layout-workspaces/workspaces/")({
	component: PageEmpty,
});
