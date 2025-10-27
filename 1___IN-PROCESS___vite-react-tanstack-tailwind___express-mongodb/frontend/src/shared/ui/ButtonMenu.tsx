import { MoreHoriz } from "@mui/icons-material";
import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

export const ButtonMenu = <
	T extends { children: React.ReactNode; onClick?: () => void; id?: string | number },
>({
	data,
	onChange,
}: {
	data: T[];
	onChange?: (item: T) => void;
}) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = !!anchorEl;

	//
	const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);
	const handleSelect = (item: T) => {
		onChange?.(item);
		item?.onClick?.();
		handleClose();
	};

	//
	return (
		<div>
			<Button
				id="basic-button"
				aria-controls={open ? "basic-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={handleOpen}
			>
				<MoreHoriz />
			</Button>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				slotProps={{ list: { "aria-labelledby": "basic-button" } }}
			>
				{data?.map((item, i) => (
					<MenuItem key={item.id ?? i} onClick={() => handleSelect(item)}>
						{item.children}
					</MenuItem>
				))}
			</Menu>
		</div>
	);
};
