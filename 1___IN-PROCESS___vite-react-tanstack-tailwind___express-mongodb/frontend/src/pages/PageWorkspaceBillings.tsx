import { Button } from "@mui/material";
import { useState } from "react";

import { ModalBillingUpgradeToPro } from "@widgets/modals/ModalBillingUpgradeToPro";

export const PageWorkspaceBilling = () => {
	const [open, setOpen] = useState(false);
	const toggleOpen = () => setOpen(s => !s);

	//
	return (
		<>
			<div>
				<Button variant="contained" onClick={toggleOpen}>
					Upgrade to pro
				</Button>
			</div>

			{/*  */}
			<ModalBillingUpgradeToPro modalProps={{ open, onClose: toggleOpen }} />
		</>
	);
};
