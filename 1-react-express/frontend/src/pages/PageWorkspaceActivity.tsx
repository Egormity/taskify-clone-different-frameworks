import { formatDate } from "date-fns";

const MOCK_DATA = {
	activities: [
		{
			id: "1",
			userId: "user1",
			activityName: "Activity name 1",
			date: "2024-06-01T10:00:00Z",
			workspaceId: "1",
			boardId: "1",
		},
	],
	activityUsers: {
		user1: { id: "user1", name: "User 1", avatar: null },
		user2: { id: "user2", name: "User 2", avatar: null },
	},
};

export const PageWorkspaceActivity = () => {
	return (
		<div>
			{MOCK_DATA.activities.map(item => {
				const user = MOCK_DATA.activityUsers[item.userId];
				return (
					<div className="flex items-center gap-4">
						<div>Avatar</div>
						<div>
							<p className="flex items-center gap-1.5">
								<span className="font-bold">{user.name}:</span>
								<span>{item.activityName}</span>
							</p>
							<p className="text-stone-600">{formatDate(item.date, "MMM dd, yyyy - hh:mm")}</p>
						</div>
					</div>
				);
			})}
		</div>
	);
};
