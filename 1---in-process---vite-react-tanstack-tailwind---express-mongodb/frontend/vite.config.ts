import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
	server: {
		host: "0.0.0.0",
		port: 5173,
		watch: {
			usePolling: true, // Important for Docker file watching
		},
	},
	plugins: [
		react({
			babel: {
				plugins: [["babel-plugin-react-compiler"]],
			},
		}),
		tanstackRouter({ target: "react", autoCodeSplitting: true }),
		// vite.config.ts
		svgr({
			svgrOptions: {
				icon: true, // Optimize for icons
				dimensions: false, // Remove width/height attributes
				expandProps: "end", // Pass props at the end
				plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
				svgoConfig: {
					plugins: [
						{
							name: "preset-default",
							params: {
								overrides: {
									// CRITICAL: Keep these for proper scaling
									removeViewBox: false,
									// Optional: Keep for accessibility
									removeTitle: false,
									removeDesc: false,
								},
							},
						},
						// Additional optimizations that are safe
						"removeXMLNS", // Remove xmlns (not needed in JSX)
						"removeStyleElement", // Remove <style> elements
						"removeScriptElement", // Remove <script> elements
					],
				},
			},
		}),
		tailwindcss(),
	],
	resolve: {
		alias: {
			"@/api": path.resolve(__dirname, "./src/app/api/index.ts"),
			"@/providers": path.resolve(__dirname, "./src/app/providers/index.ts"),
			"@/store": path.resolve(__dirname, "./src/app/store/index.ts"),

			"@/pages": path.resolve(__dirname, "./src/pages/index.ts"),

			"@/assets": path.resolve(__dirname, "./src/shared/assets/index.ts"),
			"@/constants": path.resolve(__dirname, "./src/shared/constants/index.ts"),
			"@/hooks": path.resolve(__dirname, "./src/shared/hooks/index.ts"),
			"@/types": path.resolve(__dirname, "./src/shared/types/index.ts"),
			"@/ui": path.resolve(__dirname, "./src/shared/ui/index.ts"),

			"@/widgets": path.resolve(__dirname, "./src/widgets/index.ts"),
		},
	},
});
