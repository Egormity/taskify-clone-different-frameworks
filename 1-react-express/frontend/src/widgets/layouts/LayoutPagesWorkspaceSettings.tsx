import { Button } from "@mui/material";
import { Link, useParams } from "@tanstack/react-router";
import classNames from "classnames";

export const LayoutPagesWorkspaceSettings = ({ children }: { children: React.ReactNode }) => {
	const params = useParams({
		from: "/_layout-authenticated/_layout-workspaces/workspaces/$workspaceId/_layout-settings",
	});

	return (
		<div className="grid h-full grid-cols-[calc(100px+5vw)_1fr]">
			<aside className="flex h-full max-h-[calc(100vh-64px-40px*2-80px-20px)] flex-col gap-2 overflow-auto border-r-2 border-r-stone-200 pt-5 pr-5">
				{[
					{ name: "Members", path: "/members" },
					{ name: "Settings", path: "/settings" },
				].map(item => (
					<Link key={item.name} to={"/workspaces/$workspaceId/settings" + item.path} params={params}>
						{({ isActive }) => (
							<Button
								variant={isActive ? "outlined" : undefined}
								className={classNames(isActive && "bg-primary-50!")}
								fullWidth
							>
								<p className="mr-auto">{item.name}</p>
							</Button>
						)}
					</Link>
				))}
			</aside>
			<div className="max-h-[calc(100vh-64px-40px*2-80px)] overflow-auto px-5">{children}</div>
		</div>
	);
};
