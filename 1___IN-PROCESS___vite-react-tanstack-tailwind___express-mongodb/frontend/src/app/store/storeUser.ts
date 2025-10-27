import { create } from "zustand";

const MOCK_WORKSPACES = [
	{
		id: "1",
		name: "Workspace 1",
		logo: null,
		subscriptionPlanName: "free",
		modules: [
			{ moduleTypeName: "boards" },
			{ moduleTypeName: "activity" },
			{ moduleTypeName: "settings" },
			{ moduleTypeName: "billing" },
		],
	},
	{
		id: "2",
		name: "Workspace 2",
		logo: null,
		subscriptionPlanName: "free",
		modules: [{ moduleTypeName: "boards" }],
	},
	{
		id: "3",
		name: "Workspace 3",
		logo: null,
		subscriptionPlanName: "billed",
		modules: [{ moduleTypeName: "boards" }, { moduleTypeName: "activity" }],
	},
];

export const useStoreUser = create<{
	isAuthenticated: boolean | null;
	setIsAuthenticated: (value: boolean | null) => void;
	workspaces: null | Array<{
		id: string;
		name: string;
		logo: null;
		subscriptionPlanName: string;
		modules: Array<{ moduleTypeName: string }>;
	}>;
}>(set => ({
	isAuthenticated: null,
	setIsAuthenticated: isAuthenticated => set({ isAuthenticated }),
	workspaces: MOCK_WORKSPACES,
}));
