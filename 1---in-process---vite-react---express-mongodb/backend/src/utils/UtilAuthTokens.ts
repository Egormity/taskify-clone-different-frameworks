import jsonwebtoken from "jsonwebtoken";
import { Request, Response } from "express";

import { TUser } from "../models/ModelUser";
import utilSendResJson from "../utils/utilSendResJson";

// Tokens configuration
const TOKENS_CONFIG = {
	accessToken: {
		expiresIn: process.env.JWT_ACCESS_EXPIRES_IN!,
	},
	refreshToken: {
		expiresIn: process.env.JWT_REFRESH_EXPIRES_IN!,
	},
	cookie: {
		expiresIn: Number(process.env.JWT_COOKIE_EXPIRES_IN_DAYS!) * 24 * 60 * 60 * 1000,
	},
};

// Generate JWT tokens
const generateAccessToken = (id: string): string =>
	jsonwebtoken.sign({ id, type: "access" }, process.env.JWT_ACCESS_SECRET!, {
		expiresIn: TOKENS_CONFIG.accessToken.expiresIn as any,
	});
const generateRefreshToken = (id: string): string =>
	jsonwebtoken.sign({ id, type: "refresh" }, process.env.JWT_REFRESH_SECRET!, {
		expiresIn: TOKENS_CONFIG.refreshToken.expiresIn as any,
	});

//
export type TVerifyToken<TType extends "access" | "refresh"> = {
	id: string;
	type: TType;
	iat: number;
	exp: number;
};

//
export default class UtilAuthTokens {
	private static readonly _createSendTokens = ({
		isAccessToken,
		isRefreshToken,
		res,
		req,
		user,
		statusCode,
		message,
	}: {
		isAccessToken: boolean;
		isRefreshToken: boolean;
		req: Request;
		res: Response;
		statusCode: number;
		user: TUser;
		message?: string;
	}) => {
		isAccessToken &&
			res.cookie("accessToken", generateAccessToken(user._id as string), {
				expires: new Date(Date.now() + TOKENS_CONFIG.cookie.expiresIn),
				secure: req.secure || req.headers["x-forwarded-proto"] === "https",
				httpOnly: true,
				sameSite: "strict",
			});
		isRefreshToken &&
			res.cookie("refreshToken", generateRefreshToken(user._id as string), {
				expires: new Date(Date.now() + TOKENS_CONFIG.cookie.expiresIn),
				secure: req.secure || req.headers["x-forwarded-proto"] === "https",
				httpOnly: true,
				sameSite: "strict",
			});
		const userWithoutPassword = { ...user, password: undefined };
		utilSendResJson({
			res,
			statusCode,
			user: userWithoutPassword,
			message,
		});
	};

	//
	public static readonly createSendBothTokens = (params: {
		req: Request;
		res: Response;
		statusCode: number;
		user: TUser;
		message?: string;
	}) => this._createSendTokens({ isAccessToken: true, isRefreshToken: true, ...params });
	public static readonly crateSendRefreshToken = (params: {
		req: Request;
		res: Response;
		statusCode: number;
		user: TUser;
		message?: string;
	}) => this._createSendTokens({ isAccessToken: false, isRefreshToken: true, ...params });

	//
	private static readonly _verifyToken = <TType extends "access" | "refresh">(
		token: string,
		type: TType,
	): TVerifyToken<TType> => {
		const secret = type === "access" ? process.env.JWT_ACCESS_SECRET! : process.env.JWT_REFRESH_SECRET!;
		return jsonwebtoken.verify(token, secret) as TVerifyToken<TType>;
	};

	//
	public static readonly verifyAccessToken = (token: string): TVerifyToken<"access"> =>
		this._verifyToken(token, "access");
	public static readonly verifyRefreshToken = (token: string): TVerifyToken<"refresh"> =>
		this._verifyToken(token, "refresh");
}
