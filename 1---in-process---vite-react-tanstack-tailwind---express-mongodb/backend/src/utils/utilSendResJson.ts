import { Response } from "express";

import { TUserSelectedFields } from "../models/ModelUser";

export default ({
	res,
	statusCode,
	status = "success",
	message,
	data,
	user,
	// accessToken,
	// refreshToken,
	stack,
}: {
	res: Response;
	statusCode: number;
	status?: string;
	message?: string;
	data?: unknown;
	user?: TUserSelectedFields;
	accessToken?: string;
	refreshToken?: string;
	stack?: string;
}) =>
	res.status(statusCode).json({
		statusCode,
		status,
		message,
		data,
		user,
		// accessToken,
		// refreshToken,
		stack,
	});
