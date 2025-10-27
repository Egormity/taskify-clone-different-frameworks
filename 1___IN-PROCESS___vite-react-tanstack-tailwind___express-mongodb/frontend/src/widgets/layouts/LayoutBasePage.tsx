// import { Backdrop, Modal } from "@mui/material";
import classnames from "classnames";

export const LayoutBasePage = ({
	childrenProps,
	headerProps,
	footerProps,
}: {
	childrenProps: React.HTMLAttributes<HTMLDivElement>;
	headerProps?: React.HTMLAttributes<HTMLDivElement>;
	footerProps?: React.HTMLAttributes<HTMLDivElement>;
}) => {
	return (
		<>
			{/* <div className="bg-primary-300 fixed right-5 bottom-5 z-50 px-10 py-5 shadow-lg md:hidden">
				<h1 className="text-2xl font-bold">Mobile not ready!</h1>
				<h3 className="text-stone-600">Not recommended to use</h3>
			</div> */}

			{/*  */}
			<div className="h-screen">
				{headerProps && (
					<div
						{...headerProps}
						className={classnames(
							"mx-auto flex h-16 items-center gap-3 border-b-2 border-stone-200 p-5 shadow-sm lg:px-20 2xl:px-40",
							headerProps.className,
						)}
					>
						{headerProps?.children}
					</div>
				)}
				<div
					className={classnames(
						"h-full overflow-auto lg:px-20 2xl:px-40",
						headerProps && footerProps
							? "max-h-[calc(100vh-64px*2)]"
							: (headerProps || footerProps) && "max-h-[calc(100vh-64px)]",
						childrenProps.className,
					)}
				>
					{childrenProps.children}
				</div>
				{footerProps && (
					<div
						{...footerProps}
						className={classnames(
							"flex h-16 items-center gap-3 border-t-2 border-stone-200 p-5 shadow-sm lg:px-20 2xl:px-40",
							footerProps.className,
						)}
					>
						{footerProps?.children}
					</div>
				)}
			</div>
		</>
	);
};
