import { UseMutationOptions, UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

import { axiosBase } from "@/api";

import { TExtractUrlParamsRecord, TResponseWrapper } from "@/types";

//
export const useApiMutation = <
	TVariables = never,
	TResponseData = never,
	TError extends Error = AxiosError,
	TUrl extends string = any,
	TVariablesFormatted = { data?: TVariables; urlParams?: TExtractUrlParamsRecord<TUrl> },
>({
	url,
	method,
	useMutationOptions,
	onSuccessInvalidateQueryKeys,
}: {
	url: TUrl;
	method: "post" | "put" | "patch" | "delete";
	useMutationOptions?: UseMutationOptions<
		AxiosResponse<TResponseWrapper<TResponseData>>,
		TError,
		TVariablesFormatted
	>;
	onSuccessInvalidateQueryKeys?: unknown[][];
}): UseMutationResult<AxiosResponse<TResponseWrapper<TResponseData>>, TError, TVariablesFormatted> => {
	const queryClient = useQueryClient();
	return useMutation<AxiosResponse<TResponseWrapper<TResponseData>>, TError, TVariablesFormatted>({
		...useMutationOptions,
		mutationKey: ["/user/postOne"],
		mutationFn: async ({ data, urlParams }) => {
			try {
				const res = await (method === "delete"
					? axiosBase.delete(url, { data })
					: axiosBase[method](url, data));
				if (res.data.message) toast.success(res.data.message);
				return res;
			} catch (error) {
				console.log("useApiMutation", url, error);
				if (error instanceof AxiosError) toast.error(error.response?.data.message || error.message);
				throw error;
			}
		},
		onSuccess: (...props) => {
			useMutationOptions?.onSuccess?.(...props);
			onSuccessInvalidateQueryKeys?.forEach(keyArr => queryClient.invalidateQueries({ queryKey: keyArr }));
		},
	});
};
