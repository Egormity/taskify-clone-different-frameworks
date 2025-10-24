import { KeyboardArrowDown } from "@mui/icons-material";
import { Button, ButtonProps } from "@mui/material";
import classNames from "classnames";
import { useState } from "react";

export const Dropdown = <T extends { id: string | number; name: string; icon?: React.ReactNode }>({
	name,
	icon,
	data,
	onItemClick,
	getHeaderButtonProps,
	getItemButtonProps,
	isOpenInitial = false,
}: {
	name?: React.ReactNode;
	icon?: React.ReactNode;
	data: T[];
	onItemClick?: (item: T) => void;
	getHeaderButtonProps?: ({ isOpen }: { isOpen: boolean }) => ButtonProps;
	getItemButtonProps?: ({ item }: { item: T }) => ButtonProps;
	isOpenInitial?: boolean;
}) => {
	const [isOpen, setIsOpen] = useState(isOpenInitial);
	const toggleIsOpen = () => setIsOpen(s => !s);

	//
	const headerButtonProps = getHeaderButtonProps?.({ isOpen });

	//
	return (
		<div className="grid gap-1">
			<Button
				fullWidth
				{...headerButtonProps}
				className={classNames("gap-2", headerButtonProps?.className)}
				onClick={e => {
					toggleIsOpen();
					headerButtonProps?.onClick?.(e);
				}}
			>
				{icon}
				<h3 className="text-lg">{name}</h3>
				<KeyboardArrowDown className={classNames("ml-auto", isOpen && "rotate-180")} />
			</Button>
			{isOpen && (
				<div className="flex w-full flex-col gap-2 pl-7">
					{data.map(item => {
						const itemButtonProps = getItemButtonProps?.({ item });
						return (
							<Button
								key={item.id}
								fullWidth
								{...itemButtonProps}
								className={classNames("gap-2", itemButtonProps?.className)}
								onClick={e => {
									onItemClick?.(item);
									itemButtonProps?.onClick?.(e);
								}}
							>
								{item.icon}
								<p className="mr-auto">{item.name}</p>
							</Button>
						);
					})}
				</div>
			)}
		</div>
	);
};
