import { Tabs as MuiTabs, Tab, TabProps, TabsProps } from "@mui/material";
import { NavigateOptions, useNavigate } from "@tanstack/react-router";
import classNames from "classnames";
import { useState } from "react";

export const Tabs = <T extends { tabProps: TabProps; children?: React.ReactNode }>({
	tabsData,
	tabsProps,
	customChildren,
	childrenContainerProps,
	containerProps,
	getTabNavigateProps,
	defaultValue = 0,
}: {
	tabsData: T[];
	tabsProps?: TabsProps;
	customChildren?: React.ReactNode;
	childrenContainerProps?: React.HTMLAttributes<HTMLDivElement>;
	containerProps?: React.HTMLAttributes<HTMLDivElement>;
	getTabNavigateProps?: ({ tab }: { tab: T }) => NavigateOptions;
	defaultValue?: number;
}) => {
	const navigate = useNavigate();
	const [value, setValue] = useState(defaultValue);

	//
	return (
		<div {...containerProps} className={classNames("h-full", containerProps?.className)}>
			<MuiTabs {...tabsProps} onChange={(e, value) => setValue(value)} value={value}>
				{tabsData.map(tab => {
					return (
						<Tab
							key={"" + tab.tabProps.label + tab.tabProps.value}
							{...tab.tabProps}
							className={classNames("text-base!", tab.tabProps.className)}
							onClick={e => {
								const tabLinkProps = getTabNavigateProps?.({ tab });
								if (tabLinkProps) navigate(tabLinkProps);
								tab.tabProps.onClick?.(e);
							}}
						/>
					);
				})}
			</MuiTabs>
			{(customChildren || tabsData[value].children) && (
				<div
					{...childrenContainerProps}
					className={classNames("h-full pt-5", childrenContainerProps?.className)}
				>
					{customChildren || tabsData[value].children}
				</div>
			)}
		</div>
	);
};
