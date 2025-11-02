import { createFileRoute } from "@tanstack/react-router";

import { PageTermsOfUse } from "@/pages";

export const Route = createFileRoute("/_layout-unauthenticated/terms-of-use")({
	component: PageTermsOfUse,
});
