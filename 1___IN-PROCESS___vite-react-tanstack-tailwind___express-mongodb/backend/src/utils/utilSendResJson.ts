import { Response } from "express";

export default ({
	res,
	statusCode,
	status = "success",
	message,
	data,
}: {
	res: Response;
	statusCode: number;
	status?: string;
	message?: string;
	data?: any;
}) => res.status(statusCode).json({ status, message, data });
