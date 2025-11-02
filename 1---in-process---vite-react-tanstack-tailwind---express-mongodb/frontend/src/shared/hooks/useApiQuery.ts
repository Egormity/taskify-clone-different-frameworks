import { UseQueryOptions, UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useMemo } from "react";
import { toast } from "react-toastify";

import { axiosBase } from "@/api";

import { TResponseWrapper } from "@/types";

//
export const useApiQuery = <
	TResponseData = any,
	TParams extends Record<string, unknown> = any,
	TFlatData = TResponseData extends { data: infer T } ? T | null : TResponseData | null,
>({
	url,
	config,
	params,
	useQueryOptions,
	onSuccess,
	onError,
	isToastSuccess = true,
	isToastError = true,
}: {
	url: string;
	config?: AxiosRequestConfig;
	params?: TParams;
	useQueryOptions: Omit<
		UseQueryOptions<AxiosResponse<TResponseWrapper<TResponseData>>, AxiosError>,
		"queryFn"
	>;
	onSuccess?: (data: AxiosResponse<TResponseWrapper<TResponseData>>) => void;
	onError?: (data: AxiosError) => void;
	isToastSuccess?: boolean;
	isToastError?: boolean;
}): UseQueryResult<AxiosResponse<TResponseWrapper<TResponseData>>, AxiosError> & {
	flatData: TFlatData;
	innerData: TResponseWrapper<TResponseData> | null;
} => {
	const useQueryResult = useQuery<AxiosResponse<TResponseWrapper<TResponseData>>, AxiosError>({
		...useQueryOptions,
		queryKey: [url, config, params, ...(useQueryOptions?.queryKey || [])],
		queryFn: async () => {
			try {
				const res = await axiosBase.get(url, { ...config, params: { ...config?.params, ...params } });
				if (res.data.message && isToastSuccess) toast.success(res.data.message);
				onSuccess?.(res);
				return res;
			} catch (error) {
				console.log("useApiQuery", url, error);
				if (error instanceof AxiosError && isToastError)
					toast.error(error.response?.data.message || error.message);
				onError?.(error as AxiosError);
				throw error;
			}
		},
	});

	//
	const innerData = useMemo(() => useQueryResult.data?.data || null, [useQueryResult.data?.data]);

	//
	const flatData: TFlatData = useMemo(() => {
		if (!!innerData && typeof innerData === "object" && "data" in innerData)
			return (innerData.data || null) as TFlatData;
		return (innerData || null) as TFlatData;
	}, [innerData]);

	//
	return { ...useQueryResult, innerData, flatData };
};
