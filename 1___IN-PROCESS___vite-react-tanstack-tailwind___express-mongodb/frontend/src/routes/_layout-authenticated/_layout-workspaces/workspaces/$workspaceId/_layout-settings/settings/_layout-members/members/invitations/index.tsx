import { createFileRoute } from "@tanstack/react-router";

import { PageWorkspaceSettingsMembersInvitations } from "@pages/PageWorkspaceSettingsMembersInvitations";

export const Route = createFileRoute(
	"/_layout-authenticated/_layout-workspaces/workspaces/$workspaceId/_layout-settings/settings/_layout-members/members/invitations/",
)({
	component: PageWorkspaceSettingsMembersInvitations,
});
