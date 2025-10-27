import { Tab, TabProps, Tabs, TabsProps } from "@mui/material";
import { NavigateOptions, useNavigate } from "@tanstack/react-router";
import classNames from "classnames";
import { useState } from "react";

export const CustomTabs = <T extends { tabProps: TabProps; children?: React.ReactNode }>({
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
			<Tabs {...tabsProps} onChange={(e, value) => setValue(value)} value={value}>
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
			</Tabs>
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
