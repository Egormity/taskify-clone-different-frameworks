import { CreditCard, QueryStats, Settings, SpaceDashboard } from "@mui/icons-material";

const byModuleTypeName = {
	boards: { icon: SpaceDashboard, name: "Boards", path: "/boards" },
	activity: { icon: QueryStats, name: "Activity", path: "/activity" },
	settings: { icon: Settings, name: "Settings", path: "/settings" },
	billing: { icon: CreditCard, name: "Billing", path: "/billing" },
};

export const CONSTANTS_WORKSPACE_MODULES: {
	byModuleTypeName: typeof byModuleTypeName;
} = {
	byModuleTypeName,
};
