import { useNavigate } from "@tanstack/react-router";
import classNames from "classnames";

import { Logo } from "@/assets";

export const ButtonLogo = ({
	buttonProps,
	isNavToHome = true,
	isHoverEffects = true,
}: {
	buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
	isNavToHome?: boolean;
	isHoverEffects?: boolean;
}) => {
	const navigate = useNavigate();
	return (
		<button
			{...buttonProps}
			className={classNames(
				"flex items-center gap-2 transition",
				isHoverEffects ? "hover:opacity-75" : "cursor-default",
				buttonProps?.className,
			)}
			onClick={e => {
				if (isNavToHome) navigate({ to: "/" });
				buttonProps?.onClick?.(e);
			}}
		>
			<Logo className="-mr-2 h-5" />
			<p className="pb-3 text-lg font-semibold text-stone-950 underline decoration-orange-400 decoration-2">
				Taskify
			</p>
		</button>
	);
};
