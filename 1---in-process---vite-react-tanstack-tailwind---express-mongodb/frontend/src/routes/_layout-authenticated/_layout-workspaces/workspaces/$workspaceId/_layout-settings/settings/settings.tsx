import { createFileRoute } from "@tanstack/react-router";

import { PageWorkspaceSettingsSettings } from "@/pages";

export const Route = createFileRoute(
	"/_layout-authenticated/_layout-workspaces/workspaces/$workspaceId/_layout-settings/settings/settings",
)({
	component: PageWorkspaceSettingsSettings,
});
