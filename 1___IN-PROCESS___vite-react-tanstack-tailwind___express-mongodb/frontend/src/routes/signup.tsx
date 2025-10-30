import { createFileRoute } from "@tanstack/react-router";

import { PageAuth } from "@pages/PageAuth";

export const Route = createFileRoute("/signup")({
	component: () => <PageAuth type="signup" />,
});
