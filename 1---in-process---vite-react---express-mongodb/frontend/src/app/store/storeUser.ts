import { create } from "zustand";

import { apiAuth, apiWorkspaces } from "@/api";

export const useStoreUser = create<{
	apiUser: ReturnType<typeof apiAuth.useGetMe> | null;
	setApiUser: (user: ReturnType<typeof apiAuth.useGetMe> | null) => void;
	apiMyWorkspaces: ReturnType<typeof apiWorkspaces.useGetMyMany> | null;
	setApiMyWorkspaces: (workspaces: ReturnType<typeof apiWorkspaces.useGetMyMany> | null) => void;
	apiSelectedWorkspace: ReturnType<typeof apiWorkspaces.useGetOneById> | null;
	setApiSelectedWorkspace: (workspace: ReturnType<typeof apiWorkspaces.useGetOneById> | null) => void;
}>(set => ({
	apiUser: null,
	setApiUser: apiUser => set({ apiUser }),
	apiMyWorkspaces: null,
	setApiMyWorkspaces: apiMyWorkspaces => set({ apiMyWorkspaces }),
	apiSelectedWorkspace: null,
	setApiSelectedWorkspace: apiSelectedWorkspace => set({ apiSelectedWorkspace }),
}));
