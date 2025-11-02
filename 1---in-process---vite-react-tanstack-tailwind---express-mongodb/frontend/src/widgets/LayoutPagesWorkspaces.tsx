import { Add, Business, CreditCard, KeyboardArrowLeft } from "@mui/icons-material";
import { useParams } from "@tanstack/react-router";
import classNames from "classnames";

import { useStoreUser } from "@/store";

import { CONSTANTS_WORKSPACE_MODULES } from "@/constants";

import { ButtonPopover, Dropdown } from "@/ui";

import { FormWorkspaceCreateEdit } from "@/widgets";

export const LayoutPagesWorkspaces = ({ children }: { children: React.ReactNode }) => {
	const { user } = useStoreUser();
	const { workspaceId }: { workspaceId?: string } = useParams({
		strict: false,
	});

	//
	const dataFormatted = user?.workspaces?.map(workspace => ({
		...workspace,
		icon: <Business sx={{ fontSize: 32 }} />,
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
	const selectedWorkspace = dataFormatted?.find(el => el._id === workspaceId);

	//
	return (
		<div className="relative grid h-full grid-cols-[calc(200px+5vw)_1fr] bg-white">
			<aside className="bg-slate-100/80 py-10 pr-3 not-lg:pl-3">
				<div className="h-[50px]">
					<ButtonPopover
						buttonProps={{
							children: (
								<>
									<h2 className="font-black!">Workspaces</h2>
									<Add />
								</>
							),
							fullWidth: true,
							className: "justify-between! gap-5 underline!  underline-offset-4 text-lg!",
						}}
						popoverProps={{ children: <FormWorkspaceCreateEdit /> }}
					/>
				</div>
				<div className="max-h-[calc(100vh-64px-40px*2-50px)] space-y-3 overflow-auto">
					{dataFormatted?.map(workspace => (
						<Dropdown
							key={workspace._id}
							name={workspace.name}
							icon={workspace.icon}
							data={workspace.modules}
							getHeaderButtonProps={{
								getLinkProps: () => ({
									to: "/workspaces/$workspaceId",
									params: { workspaceId: workspace._id },
									onClick: e => e.preventDefault(),
								}),
								getButtonProps: ({ isActive }) => ({
									className: classNames(isActive && "bg-primary-200/75!"),
								}),
							}}
							getItemButtonProps={{
								getLinkProps: ({ item }) => ({
									toto: "/workspaces/$workspaceId" + item.path,
									params: { workspaceId: workspace._id },
								}),
								getButtonProps: ({ isActive }) => ({
									variant: (isActive && "contained") || undefined,
									className: classNames(isActive && "bg-primary-600!"),
								}),
							}}
							isOpenInitial={workspaceId === workspace._id}
						/>
					))}
				</div>
			</aside>

			{/*  */}
			<div className="px-5 py-10">
				{selectedWorkspace ? (
					<>
						<div className="flex h-20 items-center gap-3 border-b-2 border-b-stone-200/75 pb-3">
							<Business sx={{ fontSize: 72 }} />
							<div>
								<h1 className="text-2xl font-bold">{selectedWorkspace?.name || "-"}</h1>
								<p className="flex items-center gap-1 text-stone-500">
									<CreditCard sx={{ fontSize: 16 }} />
									<span>{selectedWorkspace?.subscriptionPlanName || "-"}</span>
								</p>
							</div>
						</div>
						<div className="h-full max-h-[calc(100vh-64px-40px*2-80px)] overflow-auto pt-5">{children}</div>
					</>
				) : (
					<div className="flex items-center gap-2">
						<KeyboardArrowLeft />
						<h1 className="text-2xl font-semibold">Create a workspace to continue</h1>
					</div>
				)}
			</div>
		</div>
	);
};
