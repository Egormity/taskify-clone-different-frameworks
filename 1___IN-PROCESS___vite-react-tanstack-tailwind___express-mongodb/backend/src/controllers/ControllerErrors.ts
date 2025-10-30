import { Request, Response, NextFunction } from "express";

import utilSendResJson from "../utils/utilSendResJson";
import UtilAppError from "../utils/UtilAppError";

//
const sendErrorDev = (err: any, req: Request, res: Response) => {
	utilSendResJson({
		res,
		statusCode: err.statusCode,
		status: err.status,
		message: err.message,
		stack: err.stack,
	});
};

//
const sendErrorProd = (err: any, res: Response) => {
	if (err.isOperational) {
		utilSendResJson({ res, statusCode: err.statusCode, status: err.status, message: err.message });
		return;
	}
	utilSendResJson({ res, statusCode: 500, status: "error", message: "Something went wrong" });
};

//
const handleCastError = (err: any) => new UtilAppError(400, `Invalid ${err.path}: ${err.value}`);
const handleDuplicateKey = (err: any) => {
	const duplicate = err.msg.match(/(['"])(\\?.)*?\1/)[0];
	return new UtilAppError(404, `${duplicate}. Please, use another key`);
};
const handleValidationError = (err: any) => {
	const errors = Object.values(err.errors).map((error: any) => error.message);
	return new UtilAppError(400, `Invalid input data ${errors.join(". ")}`);
};
const handleJWTError = () => new UtilAppError(401, "Invalid token. Please login again");
const handleJWTExpired = () => new UtilAppError(401, "Your token has expired. Please login again");

//
export default (err: any, req: Request, res: Response, next: NextFunction) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || "error";

	if (process.env.NODE_ENV === "development") {
		sendErrorDev(err, req, res);
		return;
	}

	const handledError = (() => {
		if (err.name === "CastError") return handleCastError(err);
		if (err.code === 11000) return handleDuplicateKey(err);
		if (err.name === "ValidationError") return handleValidationError(err);
		if (err.name === "JsonWebTokenError") return handleJWTError();
		if (err.name === "TokenExpiredError") return handleJWTExpired();
	})();
	sendErrorProd(handledError, res);
};
