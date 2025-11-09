import { TLogin, TSignup } from "@/api";

import { useApiMutation, useApiQuery } from "@/hooks";

//
const BASE_URL = "/auth";

//
const useSignup = () =>
	useApiMutation<TSignup>({
		url: `${BASE_URL}/signup`,
		method: "post",
	});
const useLogin = () =>
	useApiMutation<TLogin>({
		url: `${BASE_URL}/login`,
		method: "post",
	});
const useLogout = () =>
	useApiMutation({
		url: `${BASE_URL}/logout`,
		method: "post",
	});
const useGetMe = () =>
	useApiQuery({
		url: `${BASE_URL}/me`,
		useQueryOptions: { queryKey: ["/auth/me"], retry: false },
		isToastError: false,
	});

//
export const apiAuth = {
	useSignup,
	useLogin,
	useLogout,
	useGetMe,
};
