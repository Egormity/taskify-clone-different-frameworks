import { createFileRoute } from "@tanstack/react-router";

import { PageWorkspaceSettingsMembersInvitationsInviteMembers } from "@pages/PageWorkspaceSettingsMembersInvitationsInviteMembers";

export const Route = createFileRoute(
	"/_layout-authenticated/_layout-workspaces/workspaces/$workspaceId/_layout-settings/settings/_layout-members/members/invitations/invite-members",
)({
	component: PageWorkspaceSettingsMembersInvitationsInviteMembers,
});
