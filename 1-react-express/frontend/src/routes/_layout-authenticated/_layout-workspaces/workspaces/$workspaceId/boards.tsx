import { createFileRoute } from "@tanstack/react-router";

import { PageWorkspaceBoards } from "@pages/PageWorkspaceBoards";

export const Route = createFileRoute("/_layout-authenticated/_layout-workspaces/workspaces/$workspaceId/boards")({
	component: PageWorkspaceBoards,
});
