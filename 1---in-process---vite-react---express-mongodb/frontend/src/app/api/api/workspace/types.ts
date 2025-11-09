import { TBillingPlan } from "@/api";

export type TWorkspaceModuleTypeName = "boards" | "activity" | "settings" | "billing";

export type TWorkspace = {
	_id: string;
	name: string;
	availableModules: Array<TWorkspaceModuleTypeName>;
	billingPlan: string;
	members: Array<any>;
	boards: Array<string>;
};

export type TWorkspacePopulated = {
	_id: string;
	name: string;
	availableModules: Array<TWorkspaceModuleTypeName>;
	billingPlan: TBillingPlan;
	members: Array<any>;
	boards: Array<any>;
};
