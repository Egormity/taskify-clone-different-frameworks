import { useApiMutation } from "@shared/hooks/useApiMutation";
import { useApiQuery } from "@shared/hooks/useApiQuery";

//
const BASE_URL = "/user";

//
const useGetMany = () => useApiQuery({ url: BASE_URL, useQueryOptions: { queryKey: ["/user/get"] } });
const useGetOneById = ({ id }: { id: string }) =>
	useApiQuery({ url: `${BASE_URL}/${id}`, useQueryOptions: { queryKey: ["/user/getOneById", id] } });
const usePostOne = () => useApiMutation({ url: BASE_URL, method: "post" });
const usePatchOneById = () => useApiMutation({ url: `${BASE_URL}/:id`, method: "patch" });
const useDeleteOneById = () => useApiMutation({ url: `${BASE_URL}/:id`, method: "delete" });

//
export const apiUser = {
	BASE_URL,
	useGetMany,
	useGetOneById,
	usePostOne,
	usePatchOneById,
	useDeleteOneById,
};
