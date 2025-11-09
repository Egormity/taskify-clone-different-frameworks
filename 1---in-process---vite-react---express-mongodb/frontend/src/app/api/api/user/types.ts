import { TWorkspace } from "@/api";

export type TUser = {
	_id: string;
	username: string;
	email: string | null;
	workspaces: Array<TWorkspace>;
};
