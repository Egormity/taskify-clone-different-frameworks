import { Router } from "@tanstack/react-router";
import axios, { InternalAxiosRequestConfig } from "axios";

import { router } from "@/providers";

import { CONSTANTS_API } from "@/constants";

// CREATE BASE AXIOS
export const axiosBase = axios.create({
	baseURL: CONSTANTS_API.baseUrl,
	headers: { "Content-Type": "application/json" },
	withCredentials: true,
});

// REFRESH TOKEN
let refreshTokenPromise: Promise<boolean> | null = null;

//
const replaceToAuth = () => {
	const isAuthenticatedRoute = router.state.matches.some(el => el.id.includes("_layout-authenticated"));
	if (isAuthenticatedRoute) window.location.replace("/login");
};

// HANDLE AUTH
axiosBase.interceptors.response.use(
	response => response,
	async error => {
		// Сетевая ошибка или иная проблема без ответа от сервера
		if (!error.response) throw error;

		// Обрабатываем 401
		const status = error.response.status;
		const isUnauthorized = status === 401;
		if (!isUnauthorized) throw error;

		// Получаем оригинальный запрос
		const originalRequest = error.config as InternalAxiosRequestConfig;
		// console.log("!!!!!", originalRequest);

		// Если ошибка произошла на запросе обновления токена — больше не пытаемся
		if (originalRequest.url?.startsWith("/auth/update-refresh-token")) {
			console.log("axiosBase", "Ошибка на обновление refresh-token(а), переход в авторизацию");
			replaceToAuth();
			throw error;
		}
		if (originalRequest.url !== "/auth/me" && originalRequest.url?.startsWith("/auth")) throw error;

		// Если обновление уже запущено — ждём его завершения, иначе запускаем
		if (!refreshTokenPromise)
			refreshTokenPromise = axiosBase
				.post("/auth/update-refresh-token")
				.then(() => true)
				.catch(() => {
					replaceToAuth();
					return false;
				})
				.finally(() => (refreshTokenPromise = null));

		// Ждем завершения обновления токена
		const isRefreshed = await refreshTokenPromise;
		if (!isRefreshed) throw error;

		// Повторяем исходный запрос
		const res = await axiosBase.request(originalRequest);

		// Возвращаем результат
		return res;
	},
);
