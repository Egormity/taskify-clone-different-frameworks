import { Button } from "@mui/material";
import { useState } from "react";

import { ModalBillingUpgradeToPro } from "@widgets/Modals/ModalBillingUpgradeToPro";

export const PageWorkspaceBilling = () => {
	const [open, setOpen] = useState(false);
	const toggleOpen = () => setOpen(s => !s);

	//
	return (
		<>
			<div className="px-10 py-5">
				<Button variant="contained" onClick={toggleOpen}>
					Upgrade to pro
				</Button>
			</div>

			{/*  */}
			<ModalBillingUpgradeToPro modalProps={{ open, onClose: toggleOpen }} />
		</>
	);
};
