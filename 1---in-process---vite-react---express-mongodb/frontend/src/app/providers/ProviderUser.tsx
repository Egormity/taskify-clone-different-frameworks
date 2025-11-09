import { CircularProgress } from "@mui/material";
import { useMatches, useNavigate, useParams } from "@tanstack/react-router";
import { useEffect } from "react";

import { apiAuth, apiWorkspaces } from "@/api";

import { useStoreUser } from "@/store";

//
export const ProviderUser = () => {
	const { setApiUser, setApiMyWorkspaces, setApiSelectedWorkspace } = useStoreUser();
	const navigate = useNavigate();
	const { workspaceId } = useParams({ strict: false });
	const matches = useMatches();
	const isAuthRoute = matches.some(el => el.id.includes("_layout-authenticated"));

	//
	const apiUser = apiAuth.useGetMe();
	useEffect(() => {
		setApiUser(apiUser);
	}, [setApiUser, apiUser.isLoading, apiUser.innerData]);

	//
	useEffect(() => {
		if (apiUser?.isLoading) return;
		if (apiUser?.innerData?.user && !isAuthRoute) navigate({ to: "/workspaces" });
		else if (!apiUser?.innerData?.user && isAuthRoute) navigate({ to: "/login" });
	}, [apiUser?.isLoading, apiUser?.innerData, navigate, isAuthRoute, matches]);

	//
	const apiMyWorkspaces = apiWorkspaces.useGetMyMany({ enabled: !!apiUser?.innerData?.user });
	useEffect(() => {
		setApiMyWorkspaces(apiMyWorkspaces);
	}, [setApiMyWorkspaces, apiMyWorkspaces?.isLoading, apiMyWorkspaces?.innerData]);

	//
	const apiSelectedWorkspace = apiWorkspaces.useGetOneById({ id: workspaceId });
	useEffect(() => {
		setApiSelectedWorkspace(apiSelectedWorkspace);
	}, [setApiSelectedWorkspace, apiSelectedWorkspace?.isLoading, apiSelectedWorkspace?.innerData]);

	//
	if (apiUser.isLoading)
		return (
			<div className="fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center backdrop-blur-xs">
				<CircularProgress />
			</div>
		);
	return null;
};
