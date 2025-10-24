import { Button } from "@mui/material";

import { LayoutBasePage } from "@widgets/layouts/LayoutBasePage";

import { ButtonLogo } from "@shared/ui/ButtonLogo";

export const LayoutPagesAuthenticated = ({ children }: { children: React.ReactNode }) => {
	return (
		<LayoutBasePage
			childrenProps={{
				children,
				className: "bg-slate-50",
			}}
			headerProps={{
				className: "gap-5",
				children: (
					<>
						<ButtonLogo />
						<Button variant="contained" color="info">
							TODO: Create
						</Button>
						<div className="ml-auto">TODO: Select workspace</div>
						<div>TODO: User</div>
					</>
				),
			}}
		/>
	);
};
