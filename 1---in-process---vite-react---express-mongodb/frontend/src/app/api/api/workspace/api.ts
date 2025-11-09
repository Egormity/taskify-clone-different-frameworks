import { TWorkspace, TWorkspacePopulated } from "@/api";

import { useApiMutation, useApiQuery } from "@/hooks";

import { NullUndefinedAble } from "@/types";

const BASE_URL = "/workspace";

const useGetMyMany = ({ enabled }: { enabled?: boolean }) =>
	useApiQuery<Array<TWorkspace>>({
		url: `${BASE_URL}/my`,
		useQueryOptions: { queryKey: ["/workspace/useGetMyMany"], enabled },
	});
const useGetOneById = ({ id }: { id: NullUndefinedAble<string> }) =>
	useApiQuery<TWorkspacePopulated>({
		url: `${BASE_URL}/${id}`,
		useQueryOptions: { queryKey: ["/workspace/getOneById", id], enabled: !!id },
	});
const usePostOne = () =>
	useApiMutation<{ name: string }>({
		url: BASE_URL,
		method: "post",
		onSuccessInvalidateQueryKeys: [["/workspace/useGetMyMany"]],
	});
const usePatchOneById = () =>
	useApiMutation<Partial<TWorkspace>>({
		url: `${BASE_URL}/:id`,
		method: "patch",
		onSuccessInvalidateQueryKeys: [["/workspace/useGetMyMany"]],
	});
const useDeleteOneById = () =>
	useApiMutation({
		url: `${BASE_URL}/:id`,
		method: "delete",
		onSuccessInvalidateQueryKeys: [["/workspace/useGetMyMany"]],
	});

export const apiWorkspaces = {
	useGetMyMany,
	useGetOneById,
	usePostOne,
	usePatchOneById,
	useDeleteOneById,
};
