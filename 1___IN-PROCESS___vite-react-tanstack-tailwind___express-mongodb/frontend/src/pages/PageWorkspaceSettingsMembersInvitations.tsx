import { Button } from "@mui/material";
import { Link, useParams } from "@tanstack/react-router";

import { CustomTable } from "@shared/ui/CustomTable";
import { columnsWorkspaceSettingsMembersInvitations } from "@shared/ui/CustomTable/columns/columns.workspaceSettingsMembersInvitations";

const MOCK_DATA = {
	data: [
		{
			name: "John Doe",
			dateInvited: "2023-01-01",
			roleName: "Admin",
			email: "johndoe@me.com",
			avatar: "",
			id: "1",
		},
		{
			name: "Jane Smith",
			dateInvited: "2023-02-15",
			roleName: "User",
			email: "janesmith@me.com",
			avatar: "",
			id: "2",
		},
	],
};

export const PageWorkspaceSettingsMembersInvitations = () => {
	const params = useParams({
		from: "/_layout-authenticated/_layout-workspaces/workspaces/$workspaceId/_layout-settings/settings",
	});
	return (
		<div className="space-y-3">
			<div className="flex items-center justify-between gap-5">
				<div>
					<h3 className="text-2xl font-bold">Individual invitations</h3>
					<p className="text-stone-600">Manually invite members and mange existing invitations</p>
				</div>
				<Link to="/workspaces/$workspaceId/settings/members/invitations/invite-members" params={params}>
					<Button size="large" variant="contained">
						Invite
					</Button>
				</Link>
			</div>
			<CustomTable
				columns={columnsWorkspaceSettingsMembersInvitations}
				data={MOCK_DATA.data}
				actionsProps={{ delete: { onClick: console.log } }}
			/>
		</div>
	);
};
