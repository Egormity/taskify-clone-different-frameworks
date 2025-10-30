import { TWorkspace } from "@app/api/api/workspace/types";

export type TUser = {
	_id: string;
	email: string;
	workspaces: Array<TWorkspace>;
};
