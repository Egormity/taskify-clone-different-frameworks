import { create } from "zustand";

import { TUser } from "@/api";

export const useStoreUser = create<{
	isAuthenticated: boolean | null;
	user: TUser | null;
	setUser: (user: TUser | null) => void;
}>(set => ({
	isAuthenticated: null,
	user: JSON.parse(localStorage.getItem("user") || "null"),
	setUser: user => {
		localStorage.setItem("user", JSON.stringify(user));
		set({ user, isAuthenticated: !!user });
	},
}));
