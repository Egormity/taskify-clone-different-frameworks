import { ThemeProvider, createTheme } from "@mui/material/styles";

export const ProviderMuiTheme = ({ children }: { children: React.ReactNode }) => {
	return (
		<ThemeProvider
			theme={createTheme({
				palette: {
					primary: {
						main: "#171717",
						light: "#2f2f2f",
						dark: "#000000",
					},
					secondary: {
						main: "#ec4899",
						light: "#f472b6",
						dark: "#db2777",
					},
					background: {
						default: "#f8fafc",
						paper: "#ffffff",
					},
				},
				typography: {
					button: {
						textTransform: "none",
						fontWeight: 600,
					},
				},
				shape: {
					borderRadius: 6,
				},
			})}
		>
			{children}
		</ThemeProvider>
	);
};
