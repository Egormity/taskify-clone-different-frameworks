import { createFileRoute } from "@tanstack/react-router";

import { PageWorkspaceBilling } from "@pages/PageWorkspaceBillings";

export const Route = createFileRoute(
	"/_layout-authenticated/_layout-workspaces/workspaces/$workspaceId/billing",
)({
	component: PageWorkspaceBilling,
});
