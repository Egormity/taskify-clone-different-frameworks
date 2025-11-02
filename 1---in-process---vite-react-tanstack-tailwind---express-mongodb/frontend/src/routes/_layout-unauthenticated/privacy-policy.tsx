import { createFileRoute } from "@tanstack/react-router";

import { PagePrivacyPolicy } from "@/pages";

export const Route = createFileRoute("/_layout-unauthenticated/privacy-policy")({
	component: PagePrivacyPolicy,
});
