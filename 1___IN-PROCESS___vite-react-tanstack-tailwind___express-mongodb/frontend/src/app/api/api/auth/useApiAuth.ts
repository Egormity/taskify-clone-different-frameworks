import { TLogin, TSignup } from "@app/api/api/auth/types";
import { useStoreUser } from "@app/store/storeUser";

import { useApiMutation } from "@shared/hooks/useApiMutation";
import { useApiQuery } from "@shared/hooks/useApiQuery";

//
const BASE_URL = "/auth";

//
const useSignup = () =>
	useApiMutation<TSignup>({
		url: `${BASE_URL}/signup`,
		method: "post",
		useMutationOptions: { onSuccess: data => useStoreUser.getState().setUser(data.data.user || null) },
	});
const useLogin = () =>
	useApiMutation<TLogin>({
		url: `${BASE_URL}/login`,
		method: "post",
		useMutationOptions: { onSuccess: data => useStoreUser.getState().setUser(data.data.user || null) },
	});
const useLogout = () =>
	useApiMutation({
		url: `${BASE_URL}/logout`,
		method: "post",
		useMutationOptions: { onSuccess: () => useStoreUser.getState().setUser(null) },
	});
const useGetMe = () =>
	useApiQuery({
		url: `${BASE_URL}/me`,
		useQueryOptions: { queryKey: ["/auth/me"] },
		onSuccess: data => useStoreUser.getState().setUser(data.data.user || null),
		onError: () => useStoreUser.getState().setUser(null),
	});

//
export const apiAuth = {
	useSignup,
	useLogin,
	useLogout,
	useGetMe,
};
