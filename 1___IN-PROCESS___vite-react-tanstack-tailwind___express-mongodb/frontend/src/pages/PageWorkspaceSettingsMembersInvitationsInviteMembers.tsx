import { Button, MenuItem, Select } from "@mui/material";
import { Link, useParams } from "@tanstack/react-router";

export const PageWorkspaceSettingsMembersInvitationsInviteMembers = () => {
	const params = useParams({
		from: "/_layout-authenticated/_layout-workspaces/workspaces/$workspaceId/_layout-settings/settings/_layout-members/members/invitations/invite-members",
	});
	return (
		<div className="space-y-5">
			<div>
				<h1 className="text-2xl font-bold">Invite members</h1>
				<p className="text-stone-600">Invite new members to this workspace</p>
			</div>
			<div>
				<h5 className="font-semibold">Email address</h5>
				<p>Input</p>
			</div>
			<div>
				<Select value={"asd"}>
					<MenuItem
						// key={role.id}
						value={"role.name"}
						// onClick={() => onSelectRole({ role, user: cell.row.original })}
					>
						role.name
					</MenuItem>
				</Select>
			</div>
			<div className="flex items-center justify-end gap-5">
				<Link to="/workspaces/$workspaceId/settings/members/invitations" params={params}>
					<Button>CANCEL</Button>
				</Link>
				<Button variant="contained" onClick={() => alert("TODO:")}>
					TODO: SEND INVITATION
				</Button>
			</div>
		</div>
	);
};
