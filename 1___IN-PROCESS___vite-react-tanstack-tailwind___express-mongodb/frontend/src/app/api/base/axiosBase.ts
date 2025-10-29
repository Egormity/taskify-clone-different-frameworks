import axios from "axios";

import { CONSTANTS_API } from "@shared/constants/constants.api";

// CREATE BASE AXIOS
export const axiosBase = axios.create({
	baseURL: CONSTANTS_API.baseUrl,
	headers: { "Content-Type": "application/json" },
	withCredentials: true,
});

// HANDLE AUTH
axiosBase.interceptors.request.use(
	response => response,
	error => error,
);
