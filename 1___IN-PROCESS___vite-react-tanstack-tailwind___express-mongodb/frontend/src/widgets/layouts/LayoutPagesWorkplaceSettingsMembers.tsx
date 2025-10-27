import { useParams } from "@tanstack/react-router";

import { CustomTabs } from "@shared/ui/CustomTabs";

export const LayoutPagesWorkplaceSettingsMembers = ({ children }: { children: React.ReactNode }) => {
	const params = useParams({
		from: "/_layout-authenticated/_layout-workspaces/workspaces/$workspaceId/_layout-settings/settings",
	});

	//
	return (
		<div>
			<div className="h-20 space-y-1">
				<h1 className="text-4xl font-bold">Members</h1>
				<h2 className="font-semibold text-stone-600">View and manage organization members</h2>
			</div>

			{/*  */}
			<CustomTabs
				defaultValue={location.pathname.includes("invitations") ? 1 : 0}
				tabsData={[
					{ tabProps: { label: "Members" }, path: "/members" },
					{ tabProps: { label: "Invitations" }, path: "/invitations" },
				]}
				customChildren={children}
				getTabNavigateProps={({ tab }) => ({
					to: ("/workspaces/$workspaceId/settings/members" + tab.path) as any,
					params,
				})}
			/>
		</div>
	);
};
