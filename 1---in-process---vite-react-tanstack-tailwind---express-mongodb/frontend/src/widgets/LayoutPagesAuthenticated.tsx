import { Button } from "@mui/material";

import { apiAuth } from "@/api";

import { useStoreUser } from "@/store";

import { ButtonLogo, ButtonPopover } from "@/ui";

import { FormBoardCreateEdit, LayoutBasePage } from "@/widgets";

export const LayoutPagesAuthenticated = ({ children }: { children: React.ReactNode }) => {
	const { user } = useStoreUser();
	const { mutate } = apiAuth.useLogout();

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
							buttonProps={{ children: "New board" }}
							popoverProps={{ children: <FormBoardCreateEdit /> }}
						/>
						<div className="ml-auto">TODO: Select workspace</div>
						<div>TODO: {user?.username}</div>
						<Button variant="outlined" onClick={() => mutate({})}>
							Log out
						</Button>
					</>
				),
			}}
		/>
	);
};
