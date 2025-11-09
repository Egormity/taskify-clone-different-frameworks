import { KeyboardArrowDown } from "@mui/icons-material";
import { Button, ButtonProps } from "@mui/material";
import { Link, LinkComponentProps } from "@tanstack/react-router";
import classNames from "classnames";
import { useState } from "react";

import { NullUndefinedAble } from "@/types";

export const Dropdown = <T extends { id: string; name: string; icon?: React.ReactNode }>({
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
	data: NullUndefinedAble<Array<T>>;
	onItemClick?: (item: T) => void;
	getHeaderButtonProps?: {
		getLinkProps?: (props: { isOpen: boolean }) => LinkComponentProps;
		getButtonProps?: (props: { isOpen: boolean; isActive: boolean | null }) => ButtonProps;
	};
	getItemButtonProps?: {
		getLinkProps?: (props: { isOpen: boolean; item: T }) => LinkComponentProps;
		getButtonProps?: (props: { isOpen: boolean; isActive: boolean | null; item: T }) => ButtonProps;
	};
	isOpenInitial?: boolean;
}) => {
	const [isOpen, setIsOpen] = useState(isOpenInitial);
	const toggleIsOpen = () => setIsOpen(s => !s);

	//
	const getHeaderButton = (props: ButtonProps | undefined) => (
		<Button
			fullWidth
			{...props}
			className={classNames("gap-2 font-normal!", props?.className)}
			onClick={e => {
				toggleIsOpen();
				props?.onClick?.(e);
			}}
		>
			{icon}
			<h3 className="text-lg">{name}</h3>
			<KeyboardArrowDown className={classNames("ml-auto", isOpen && "rotate-180")} />
		</Button>
	);

	//
	const getItemButton = (item: T, props: ButtonProps | undefined) => (
		<Button
			key={item.id}
			fullWidth
			{...props}
			className={classNames("gap-2 font-semibold!", props?.className)}
			onClick={e => {
				onItemClick?.(item);
				props?.onClick?.(e);
			}}
		>
			{item.icon}
			<p className="mr-auto">{item.name}</p>
		</Button>
	);

	//
	return (
		<div className="grid gap-1">
			{(() => {
				const headerButtonLinkProps = getHeaderButtonProps?.getLinkProps?.({ isOpen });
				if (headerButtonLinkProps)
					return (
						<Link {...headerButtonLinkProps}>
							{({ isActive }) =>
								getHeaderButton(getHeaderButtonProps?.getButtonProps?.({ isOpen, isActive }))
							}
						</Link>
					);
				return getHeaderButton(
					getHeaderButton(getHeaderButtonProps?.getButtonProps?.({ isOpen, isActive: null })),
				);
			})()}
			{isOpen && (
				<div className="flex w-full flex-col gap-2 pl-7">
					{data?.map(item => {
						const itemButtonLinkProps = getItemButtonProps?.getLinkProps?.({ isOpen, item });
						if (itemButtonLinkProps)
							return (
								<Link {...itemButtonLinkProps} key={item.id}>
									{({ isActive }) =>
										getItemButton(item, getItemButtonProps?.getButtonProps?.({ isOpen, isActive, item }))
									}
								</Link>
							);
						return getItemButton(
							item,
							getItemButtonProps?.getButtonProps?.({ isOpen, isActive: null, item }),
						);
					})}
				</div>
			)}
		</div>
	);
};
