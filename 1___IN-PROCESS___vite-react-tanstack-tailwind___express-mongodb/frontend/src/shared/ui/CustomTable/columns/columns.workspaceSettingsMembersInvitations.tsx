import { createColumnHelper } from "@tanstack/react-table";
import { formatDate } from "date-fns";

const columnHelper = createColumnHelper<{
	name: string;
	dateInvited: string;
	roleName: string;
	email: string;
	avatar: string;
	id: string;
}>();

export const columnsWorkspaceSettingsMembersInvitations = [
	columnHelper.accessor("name", {
		header: "User",
		cell: cell => (
			<div className="flex items-center gap-4">
				<div>Avatar</div>
				<div>
					<h5 className="flex items-center gap-2 font-semibold">
						<span>{cell.row.original.name}</span>
						{cell.row.original.id === "1" && (
							<span className="bg-primary-200 text-primary rounded-md px-1.5 py-0.5 text-xs">You</span>
						)}
					</h5>
					<p className="text-stone-600">{cell.row.original.email}</p>
				</div>
			</div>
		),
	}),
	columnHelper.accessor("dateInvited", {
		header: "Joined",
		cell: cell => formatDate(new Date(cell.row.original.dateInvited), "yyyy/MM/dd"),
	}),
	columnHelper.accessor("roleName", {
		header: "Role",
	}),
];
