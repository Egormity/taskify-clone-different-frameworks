export default class UtilAppError extends Error {
	public statusCode: number;
	public status: string;
	public isOperational: boolean;
	constructor(statusCode: number, message: string) {
		super(message);

		this.statusCode = statusCode;
		this.status = statusCode >= 500 ? "fail" : "error";
		this.isOperational = true;

		Error.captureStackTrace(this, this.constructor);
	}
}
