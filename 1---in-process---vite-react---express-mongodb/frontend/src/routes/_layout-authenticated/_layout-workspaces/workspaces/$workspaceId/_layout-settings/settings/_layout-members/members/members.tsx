import { createFileRoute } from "@tanstack/react-router";

import { PageWorkspaceSettingsMembersMembers } from "@/pages";

export const Route = createFileRoute(
	"/_layout-authenticated/_layout-workspaces/workspaces/$workspaceId/_layout-settings/settings/_layout-members/members/members",
)({
	component: PageWorkspaceSettingsMembersMembers,
});
