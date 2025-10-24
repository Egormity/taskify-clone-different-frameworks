import { createFileRoute } from "@tanstack/react-router";

import { PageAuth } from "@pages/PageAuth";

export const Route = createFileRoute("/login")({
	component: () => <PageAuth type="login" />,
});
