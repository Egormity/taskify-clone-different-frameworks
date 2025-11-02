import { TWorkspace } from "@/api";

import { useApiMutation, useApiQuery } from "@/hooks";

import { NullUndefinedAble } from "@/types";

const BASE_URL = "/workspaces";

const useGetMany = () => useApiQuery({ url: BASE_URL, useQueryOptions: { queryKey: ["/user/get"] } });
const useGetOneById = ({ id }: { id: NullUndefinedAble<string> }) =>
	useApiQuery({
		url: `${BASE_URL}/${id}`,
		useQueryOptions: { queryKey: ["/user/getOneById", id], enabled: !!id },
	});
const usePostOne = () => useApiMutation<{ name: string }>({ url: BASE_URL, method: "post" });
const usePatchOneById = () =>
	useApiMutation<Partial<TWorkspace>>({ url: `${BASE_URL}/:id`, method: "patch" });
const useDeleteOneById = () => useApiMutation({ url: `${BASE_URL}/:id`, method: "delete" });

export const apiWorkspaces = {
	useGetMany,
	useGetOneById,
	usePostOne,
	usePatchOneById,
	useDeleteOneById,
};
