import { createFileRoute } from "@tanstack/react-router";

import { PageWorkspaceActivity } from "@pages/PageWorkspaceActivity";

export const Route = createFileRoute("/_layout-authenticated/_layout-workspaces/workspaces/$workspaceId/activity")({
	component: PageWorkspaceActivity,
});
