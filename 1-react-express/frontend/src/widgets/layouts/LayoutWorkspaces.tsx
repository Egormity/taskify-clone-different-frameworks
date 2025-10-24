import { Add, Business } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useLocation, useNavigate, useParams } from "@tanstack/react-router";
import classNames from "classnames";

import { useStoreUser } from "@app/store/storeUser";

import { CONSTANTS_WORKSPACE_MODULES } from "@shared/constants/constantsWorkspaceModules";
import { Dropdown } from "@shared/ui/Dropdown";

export const LayoutWorkspaces = ({ children }: { children: React.ReactNode }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const { workspaces } = useStoreUser();
	const { workspaceId }: { workspaceId: string } = useParams({ strict: false });

	//
	const dataFormatted = workspaces?.map(workspace => ({
		...workspace,
		icon: <Business />,
		modules: workspace.modules.map(el => {
			const moduleFormatted =
				CONSTANTS_WORKSPACE_MODULES.byModuleTypeName[
					el.moduleTypeName as keyof typeof CONSTANTS_WORKSPACE_MODULES.byModuleTypeName
				];
			return {
				...el,
				id: el.moduleTypeName,
				...moduleFormatted,
				icon: <moduleFormatted.icon />,
			};
		}),
	}));

	//
	return (
		<div className="relative grid h-full grid-cols-[calc(200px+5vw)_1fr] bg-white not-md:grid-cols-1">
			<aside className="bg- max-h-[calc(100vh-60px-5vh)] !space-y-3 overflow-auto bg-slate-50 pt-[5vh] pr-3 md:pl-3">
				<Button className="!sticky !top-0 z-10 !justify-between !bg-slate-100" fullWidth>
					<h2 className="font-bold">Workspaces</h2>
					<Add />
				</Button>
				<div className="space-y-3">
					{dataFormatted?.map(workspace => (
						<Dropdown
							key={workspace.id}
							name={workspace.name || "-"}
							icon={workspace.icon || "-"}
							data={workspace.modules}
							onItemClick={item => navigate({ to: `/workspaces/${workspace.id}/${item.moduleTypeName}` })}
							getHeaderButtonProps={() => ({
								className: classNames(workspaceId === workspace.id && "!bg-slate-200/50"),
							})}
							getItemButtonProps={({ item }) => ({
								className: classNames(
									workspaceId === workspace.id &&
										location.pathname.includes(item.path) &&
										"!bg-cyan-200/50 !text-cyan-800",
								),
							})}
							isOpenInitial={workspaceId === workspace.id}
						/>
					))}
				</div>
			</aside>
			<div className="max-h-[calc(100vh-60px-5vh)] overflow-auto px-5 pt-[5vh]">
				<div className="mb-2 flex items-center gap-3 border-b-2 border-b-stone-200/75 pb-2">
					<Business sx={{ fontSize: 70 }} />
					<div>
						<h2 className="text-xl font-bold">{"TODO: Name"}</h2>
						<h2>{"TODO: Free or billed"}</h2>
					</div>
				</div>
				{children}
			</div>
		</div>
	);
};
