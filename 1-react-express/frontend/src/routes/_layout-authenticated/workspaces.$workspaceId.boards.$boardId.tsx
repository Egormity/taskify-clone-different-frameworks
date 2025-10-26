import { createFileRoute } from "@tanstack/react-router";

import { PageBoard } from "@pages/PageBoard";

export const Route = createFileRoute(
	"/_layout-authenticated/workspaces/$workspaceId/boards/$boardId",
)({
	component: PageBoard,
});
