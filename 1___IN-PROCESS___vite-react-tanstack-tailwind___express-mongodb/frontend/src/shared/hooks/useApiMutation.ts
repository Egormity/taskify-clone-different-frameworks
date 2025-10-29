import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import { axiosBase } from "@app/api/base/axiosBase";

import { TExtractUrlParamsRecord } from "@shared/types/types.shared";

//
export const useApiMutation = <
	TVariables = any,
	TResponse = any,
	TError extends Error = AxiosError,
	TUrl extends string = any,
	TVariablesFormatted = { data: TVariables; urlParams: TExtractUrlParamsRecord<TUrl> },
>({
	url,
	method,
	useMutationOptions,
}: {
	url: TUrl;
	method: "post" | "put" | "patch" | "delete";
	useMutationOptions?: UseMutationOptions<AxiosResponse<TResponse>, TError, TVariablesFormatted>;
}): UseMutationResult<AxiosResponse<TResponse>, TError, TVariablesFormatted> =>
	useMutation<AxiosResponse<TResponse>, TError, TVariablesFormatted>({
		...useMutationOptions,
		mutationKey: ["/user/postOne"],
		mutationFn: async ({ data }) => {
			try {
				return await (method === "delete" ? axiosBase.delete(url, { data }) : axiosBase[method](url, data));
			} catch (error) {
				if (error instanceof AxiosError || error instanceof Error) alert(error.message);
				console.log(error);
				throw error;
			}
		},
	});
