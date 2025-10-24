import { Button } from "@mui/material";
import { Link } from "@tanstack/react-router";

import { LayoutBasePage } from "@widgets/layouts/LayoutBasePage";

import { ButtonLogo } from "@shared/ui/ButtonLogo";

export const LayoutPagesUnauthenticated = ({ children }: { children: React.ReactNode }) => {
	return (
		<LayoutBasePage
			childrenProps={{ children, className: "bg-slate-100" }}
			headerProps={{
				children: (
					<>
						<ButtonLogo />
						<Link to="/login" className="ml-auto">
							<Button variant="outlined">Login</Button>
						</Link>
						<Link to="/sign-up">
							<Button variant="contained">Get Taskify for free</Button>
						</Link>
					</>
				),
			}}
			footerProps={{
				children: (
					<>
						<Link to="/privacy-policy" className="ml-auto">
							<Button>Privacy Policy</Button>
						</Link>
						<Link to="/terms-of-use">
							<Button>Terms of Service</Button>
						</Link>
					</>
				),
			}}
		/>
	);
};
