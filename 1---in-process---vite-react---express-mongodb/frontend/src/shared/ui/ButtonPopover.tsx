import Button, { ButtonProps } from "@mui/material/Button";
import Popover, { PopoverProps } from "@mui/material/Popover";
import { useState } from "react";

//
export const ButtonPopover = ({
	buttonProps,
	popoverProps,
}: {
	buttonProps?: ButtonProps;
	popoverProps?: Partial<PopoverProps>;
}) => {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

	//
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);

	//
	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;

	//
	return (
		<>
			<Button aria-describedby={id} onClick={handleClick} children="Open popover" {...buttonProps} />
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
				children="Popover children"
				{...popoverProps}
			/>
		</>
	);
};
