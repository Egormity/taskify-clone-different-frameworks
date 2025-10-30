import { TBillingPlan } from "@app/api/api/billing-plan/types";

export type TWorkspaceModuleTypeName = "boards" | "activity" | "settings" | "billing";

export type TWorkspace = {
	_id: string;
	name: string;
	logo: null;
	billingPlan: TBillingPlan;
	modules: Array<{ moduleTypeName: TWorkspaceModuleTypeName }>;
};
