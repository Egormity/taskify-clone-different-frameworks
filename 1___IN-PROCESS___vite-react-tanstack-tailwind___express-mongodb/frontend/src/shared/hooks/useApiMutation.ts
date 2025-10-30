import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

import { axiosBase } from "@app/api/base/axiosBase";

import { TExtractUrlParamsRecord, TResponseWrapper } from "@shared/types/types.api";

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
}: {
	url: TUrl;
	method: "post" | "put" | "patch" | "delete";
	useMutationOptions?: UseMutationOptions<
		AxiosResponse<TResponseWrapper<TResponseData>>,
		TError,
		TVariablesFormatted
	>;
}): UseMutationResult<AxiosResponse<TResponseWrapper<TResponseData>>, TError, TVariablesFormatted> =>
	useMutation<AxiosResponse<TResponseWrapper<TResponseData>>, TError, TVariablesFormatted>({
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
				console.log(useApiMutation, url, error);
				if (error instanceof AxiosError) toast.error(error.response?.data.message || error.message);
				else if (error instanceof Error) toast.error(error.message);
				throw error;
			}
		},
	});
