import { createFileRoute } from "@tanstack/react-router";

import { PageAuth } from "@pages/PageAuth";

export const Route = createFileRoute("/sign-up")({
	component: () => <PageAuth type="sign-up" />,
});
