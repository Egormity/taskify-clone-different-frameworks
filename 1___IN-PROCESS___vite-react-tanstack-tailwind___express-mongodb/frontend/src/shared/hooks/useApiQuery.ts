import { UseQueryOptions, UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useMemo } from "react";

import { axiosBase } from "@app/api/base/axiosBase";

//
export const useApiQuery = <
	TResponse = any,
	TParams extends Record<string, unknown> = any,
	TFlatData = TResponse extends { data: infer T } ? T | null : TResponse | null,
>({
	url,
	config,
	params,
	useQueryOptions,
}: {
	url: string;
	config?: AxiosRequestConfig;
	params?: TParams;
	useQueryOptions: Omit<UseQueryOptions<AxiosResponse<TResponse>, AxiosError>, "queryFn">;
}): UseQueryResult<AxiosResponse<TResponse>, AxiosError> & {
	flatData: TFlatData;
} => {
	const useQueryResult = useQuery<AxiosResponse<TResponse>, AxiosError>({
		...useQueryOptions,
		queryKey: [url, config, params, ...(useQueryOptions?.queryKey || [])],
		queryFn: async () => {
			try {
				return await axiosBase.get(url, { ...config, params: { ...config?.params, ...params } });
			} catch (error) {
				if (error instanceof AxiosError || error instanceof Error) alert(error.message);
				console.log(error);
				throw error;
			}
		},
	});

	//
	const flatData: TFlatData = useMemo(() => {
		const d = useQueryResult.data?.data;
		if (!!d && typeof d === "object" && "data" in d) return (d.data || null) as TFlatData;
		return (d || null) as TFlatData;
	}, [useQueryResult.data?.data]);

	//
	return { ...useQueryResult, flatData };
};
