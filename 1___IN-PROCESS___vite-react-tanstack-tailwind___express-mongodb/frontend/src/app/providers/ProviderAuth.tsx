import { CircularProgress } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import { apiAuth } from "@app/api/api/auth/useApiAuth";
import { useStoreUser } from "@app/store/storeUser";

//
const ProviderAuth = () => {
	const { user, setUser } = useStoreUser();
	const navigate = useNavigate();

	//
	const { innerData, isLoading } = apiAuth.useGetMe();
	useEffect(() => {
		if (!innerData?.user) return;
		setUser(innerData?.user);
	}, [setUser, innerData?.user]);

	//
	useEffect(() => {
		if (!user && !isLoading) navigate({ to: "/" });
	}, [user, isLoading, navigate]);

	//
	if (isLoading && !user)
		return (
			<div className="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-transparent">
				<CircularProgress />
			</div>
		);
	return null;
};
export default ProviderAuth;
