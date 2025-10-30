import { PaletteColorOptions, ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useMemo } from "react";

const ProviderMuiTheme = ({ children }: { children: React.ReactNode }) => {
	const theme: { colors: { primary: PaletteColorOptions } } = useMemo(
		() => ({
			colors: {
				primary: {
					"main": "#171717",
					"light": "#2f2f2f",
					"dark": "#000000",
					"50": "#f8fafc",
					"100": "#f1f5f9",
					"200": "#e2e8f0",
					"300": "#cbd5e1",
					"400": "#94a3b8",
					"500": "#64748b",
					"600": "#475569",
					"700": "#334155",
					"800": "#1e293b",
					"900": "#0f172a",
					"A100": "#f8fafc",
					"A200": "#f1f5f9",
					"A400": "#cbd5e1",
					"A700": "#64748b",
					"contrastText": "#ffffff",
				},
			},
		}),
		[],
	);

	//
	useEffect(() => {
		Object.entries(theme.colors).forEach(([colorName, colorValues]) => {
			Object.entries(colorValues).forEach(([shade, value]) => {
				const cssVarName = `--color-${colorName}-${shade}`;
				document.documentElement.style.setProperty(cssVarName, value as string);
			});
		});
	}, [theme]);

	//
	return (
		<ThemeProvider
			theme={createTheme({
				palette: {
					primary: theme.colors.primary,
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
				components: {
					MuiBackdrop: {
						styleOverrides: {
							root: {
								"backgroundColor": "rgba(0, 0, 0, 0.5)",
								"backdropFilter": "blur(2px)",
								// For older browsers
								"@supports not (backdrop-filter: blur(2px))": {
									backgroundColor: "rgba(0, 0, 0, 0.7)",
								},
							},
						},
					},
					MuiModal: {
						defaultProps: {
							BackdropProps: {
								// Ensure backdrop is used
								className: "mui-backdrop-blur",
							},
						},
					},
				},
			})}
		>
			{children}
		</ThemeProvider>
	);
};
export default ProviderMuiTheme;
