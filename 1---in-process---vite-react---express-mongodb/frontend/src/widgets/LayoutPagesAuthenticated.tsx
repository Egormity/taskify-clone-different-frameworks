import { Button } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";

import { apiAuth } from "@/api";

import { useStoreUser } from "@/store";

import { ButtonLogo, ButtonPopover } from "@/ui";

import { FormBoardCreateEdit, LayoutBasePage } from "@/widgets";

export const LayoutPagesAuthenticated = ({ children }: { children: React.ReactNode }) => {
	const { apiUser } = useStoreUser();
	const { mutate } = apiAuth.useLogout();
	const navigate = useNavigate();

	//
	return (
		<LayoutBasePage
			childrenProps={{
				children,
				className: "bg-slate-50",
			}}
			headerProps={{
				className: "gap-5",
				children: (
					<>
						<ButtonLogo />
						<ButtonPopover
							buttonProps={{ children: "New board", variant: "outlined" }}
							popoverProps={{ children: <FormBoardCreateEdit /> }}
						/>
						<div className="ml-auto">TODO: Select workspace</div>
						<div>TODO: {apiUser?.innerData?.user?.username}</div>
						<Button
							variant="outlined"
							onClick={() => mutate({}, { onSuccess: () => navigate({ to: "/" }) })}
						>
							Log out
						</Button>
					</>
				),
			}}
		/>
	);
};
