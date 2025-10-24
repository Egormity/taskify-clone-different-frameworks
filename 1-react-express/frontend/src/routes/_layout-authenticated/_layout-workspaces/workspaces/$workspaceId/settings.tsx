import { createFileRoute } from "@tanstack/react-router";

import { PageWorkspaceSettings } from "@pages/PageWorkspaceSettings";

export const Route = createFileRoute("/_layout-authenticated/_layout-workspaces/workspaces/$workspaceId/settings")({
	component: PageWorkspaceSettings,
});
