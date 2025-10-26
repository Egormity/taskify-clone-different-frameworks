import { Button } from "@mui/material";
import { useState } from "react";

import { ModalBoardCreate } from "@widgets/Modals/ModalBoardCreate";
import { LayoutBasePage } from "@widgets/layouts/LayoutBasePage";

import { ButtonLogo } from "@shared/ui/ButtonLogo";

export const LayoutPagesAuthenticated = ({ children }: { children: React.ReactNode }) => {
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
						<div>TODO: User</div>

						{/*  */}
						<ModalBoardCreate modalProps={{ open, onClose: toggleOpen }} />
					</>
				),
			}}
		/>
	);
};
