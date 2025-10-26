import { CustomTable } from "@shared/ui/CustomTable";
import { columnsWorkspaceSettingsMembersMembers } from "@shared/ui/CustomTable/columns/columns.workspaceSettingsMembersMembers";

const MOCK_DATA = {
	data: [
		{
			name: "John Doe",
			dateJoined: "2023-01-01",
			roleName: "Admin",
			email: "johndoe@me.com",
			avatar: "",
			id: "1",
		},
		{
			name: "Jane Smith",
			dateJoined: "2023-02-15",
			roleName: "User",
			email: "janesmith@me.com",
			avatar: "",
			id: "2",
		},
	],
};

export const PageWorkspaceSettingsMembersMembers = () => {
	return (
		<CustomTable
			columns={columnsWorkspaceSettingsMembersMembers({
				roles: [
					{ name: "Admin", id: "1" },
					{ name: "User", id: "2" },
					{ name: "Advanced user", id: "3" },
				],
				onSelectRole: ({ role, user }) => console.log(role, user),
			})}
			data={MOCK_DATA.data}
			actionsProps={{ delete: { onClick: console.log } }}
		/>
	);
};
