import { useApiMutation } from "@shared/hooks/useApiMutation";
import { useApiQuery } from "@shared/hooks/useApiQuery";
import { NullUndefinedAble } from "@shared/types/types.shared";

const BASE_URL = "/workspaces";

const useGetMany = () => useApiQuery({ url: BASE_URL, useQueryOptions: { queryKey: ["/user/get"] } });
const useGetOneById = ({ id }: { id: NullUndefinedAble<string> }) =>
	useApiQuery({
		url: `${BASE_URL}/${id}`,
		useQueryOptions: { queryKey: ["/user/getOneById", id], enabled: !!id },
	});
const usePostOne = () => useApiMutation({ url: BASE_URL, method: "post" });
const usePatchOneById = () => useApiMutation({ url: `${BASE_URL}/:id`, method: "patch" });
const useDeleteOneById = () => useApiMutation({ url: `${BASE_URL}/:id`, method: "delete" });

export const apiWorkspaces = {
	useGetMany,
	useGetOneById,
	usePostOne,
	usePatchOneById,
	useDeleteOneById,
};
