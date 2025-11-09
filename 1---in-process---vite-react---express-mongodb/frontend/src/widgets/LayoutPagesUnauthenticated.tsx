import { Button } from "@mui/material";
import { Link } from "@tanstack/react-router";

import { ButtonLogo } from "@/ui";

import { LayoutBasePage } from "@/widgets";

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
						<Link to="/signup">
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
