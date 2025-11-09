import { Add, Business, CreditCard, KeyboardArrowLeft } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "@tanstack/react-router";
import classNames from "classnames";
import { useEffect } from "react";

import { useStoreUser } from "@/store";

import { CONSTANTS_WORKSPACE_MODULES } from "@/constants";

import { ButtonPopover, Dropdown } from "@/ui";

import { FormWorkspaceCreateEdit } from "@/widgets";

export const LayoutPagesWorkspaces = ({ children }: { children: React.ReactNode }) => {
	const { apiUser, apiMyWorkspaces, apiSelectedWorkspace } = useStoreUser();
	const { workspaceId } = useParams({ strict: false });
	const navigate = useNavigate();

	//
	const dataFormatted = apiMyWorkspaces?.flatData?.map(workspace => ({
		...workspace,
		modulesFormatted: workspace.availableModules?.map(el => {
			const moduleFormatted =
				CONSTANTS_WORKSPACE_MODULES.byModuleTypeName[
					el as keyof typeof CONSTANTS_WORKSPACE_MODULES.byModuleTypeName
				];
			return {
				id: el,
				...moduleFormatted,
				icon: <moduleFormatted.icon />,
			};
		}),
	}));

	//
	useEffect(() => {
		if (workspaceId || !dataFormatted?.length) return;
		navigate({ to: `/workspaces/$workspaceId`, params: { workspaceId: dataFormatted[0]?._id } });
	}, [workspaceId, dataFormatted, navigate]);

	//
	return (
		<div className="relative grid h-full grid-cols-[calc(200px+5vw)_1fr] bg-white">
			<aside className="bg-slate-100/80 py-10 pr-3 not-lg:pl-3">
				{apiUser?.isLoading || apiMyWorkspaces?.isLoading ? (
					<div className="flex h-full items-center justify-center">
						<CircularProgress />
					</div>
				) : (
					<>
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
									icon={<Business sx={{ fontSize: 32 }} />}
									data={workspace.modulesFormatted}
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
											to: ("/workspaces/$workspaceId" + item.path) as "/workspaces/$workspaceId",
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
					</>
				)}
			</aside>

			{/*  */}
			<div className="px-5 py-10">
				{apiUser?.isLoading ||
				apiSelectedWorkspace?.isLoading ||
				(!apiSelectedWorkspace?.flatData && apiMyWorkspaces?.isLoading) ? (
					<div className="flex h-full items-center justify-center">
						<CircularProgress />
					</div>
				) : apiSelectedWorkspace?.flatData ? (
					<>
						<div className="flex h-20 items-center gap-3 border-b-2 border-b-stone-200/75 pb-3">
							<Business sx={{ fontSize: 72 }} />
							<div>
								<h1 className="text-2xl font-bold">{apiSelectedWorkspace.flatData.name || "-"}</h1>
								<p className="flex items-center gap-1 text-stone-500">
									<CreditCard sx={{ fontSize: 16 }} />
									<span>{apiSelectedWorkspace.flatData.billingPlan?.name || "-"}</span>
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
