import { Button } from "@mui/material";
import { useState } from "react";

import { apiAuth } from "@app/api/api/auth/useApiAuth";
import { useStoreUser } from "@app/store/storeUser";

import { LayoutBasePage } from "@widgets/layouts/LayoutBasePage";
import { ModalBoardCreate } from "@widgets/modals/ModalBoardCreate";

import { ButtonLogo } from "@shared/ui/ButtonLogo";

export const LayoutPagesAuthenticated = ({ children }: { children: React.ReactNode }) => {
	const { user } = useStoreUser();
	const { mutate } = apiAuth.useLogout();
	const [open, setOpen] = useState(false);
	const toggleOpen = () => setOpen(s => !s);

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
						<Button variant="contained" onClick={toggleOpen}>
							New board
						</Button>
						<div className="ml-auto">TODO: Select workspace</div>
						<div>TODO: {user?.email}</div>
						<Button variant="outlined" onClick={() => mutate({})}>
							Log out
						</Button>

						{/*  */}
						<ModalBoardCreate modalProps={{ open, onClose: toggleOpen }} />
					</>
				),
			}}
		/>
	);
};
