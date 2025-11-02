import { CircularProgress } from "@mui/material";
import { useMatches, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import { apiAuth } from "@/api";

import { useStoreUser } from "@/store";

//
export const ProviderAuth = () => {
	const { user } = useStoreUser();
	const navigate = useNavigate();
	const matches = useMatches();
	const isAuthRoute = matches.some(el => el.id.includes("_layout-authenticated"));

	//
	const { isLoading } = apiAuth.useGetMe();
	useEffect(() => {
		if (!user && !isLoading && isAuthRoute) navigate({ to: "/login" });
	}, [user, isLoading, navigate]);

	//
	if (isLoading)
		return (
			<div className="fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center backdrop-blur-xs">
				<CircularProgress />
			</div>
		);
	return null;
};
