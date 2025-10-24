import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";

import { useStoreUser } from "@app/store/storeUser";

//
export const ProviderAuth = ({ children }: { children: React.ReactNode }) => {
	const { isAuthenticated, setIsAuthenticated } = useStoreUser();
	const isLoadingAuth = false;

	//
	useEffect(() => {
		console.log("ProviderAuth");
	}, []);

	//
	return (
		<div className="h-full">
			{isLoadingAuth && <CircularProgress enableTrackSlot className="fixed top-1/2 left-1/2" />}
			<div className="h-full opacity-75">{children}</div>
		</div>
	);
};
