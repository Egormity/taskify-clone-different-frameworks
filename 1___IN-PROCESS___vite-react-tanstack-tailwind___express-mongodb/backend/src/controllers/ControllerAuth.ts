import jsonwebtoken from "jsonwebtoken";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import ModelUser, { TUser } from "../models/ModelUser";
import utilCatchAsync from "../utils/utilCatchAsync";
import utilGetFieldFromReqBody from "../utils/utilGetFieldFromReqBody";
import utilMailer from "../utils/utilMailer";
import utilSendResJson from "../utils/utilSendResJson";
import UtilAppError from "../utils/UtilAppError";

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
const generateSignTokens = (id: string): { accessToken: string; refreshToken: string } => ({
	accessToken: jsonwebtoken.sign({ id, type: "access" }, process.env.JWT_ACCESS_SECRET!, {
		expiresIn: TOKENS_CONFIG.accessToken.expiresIn as any,
	}),
	refreshToken: jsonwebtoken.sign({ id, type: "refresh" }, process.env.JWT_REFRESH_SECRET!, {
		expiresIn: TOKENS_CONFIG.refreshToken.expiresIn as any,
	}),
});

// Verify JWT token
type TVerifyToken<TType extends "access" | "refresh"> = {
	id: string;
	type: TType;
	iat: number;
	exp: number;
};
const verifyToken = <TType extends "access" | "refresh">(
	token: string,
	type: TType,
): TVerifyToken<TType> => {
	const secret = type === "access" ? process.env.JWT_ACCESS_SECRET! : process.env.JWT_REFRESH_SECRET!;
	return jsonwebtoken.verify(token, secret) as TVerifyToken<TType>;
};

// Send token response
const createSendToken = ({
	req,
	res,
	statusCode,
	user,
}: {
	req: Request;
	res: Response;
	statusCode: number;
	user: TUser;
}) => {
	// 1. Generate tokens
	const tokens = generateSignTokens((user._id as string).toString());

	// 2. Set cookies
	res.cookie("accessToken", tokens.accessToken, {
		expires: new Date(Date.now() + TOKENS_CONFIG.cookie.expiresIn),
		secure: req.secure || req.headers["x-forwarded-proto"] === "https",
		httpOnly: true,
		sameSite: "strict",
	});

	res.cookie("refreshToken", tokens.refreshToken, {
		expires: new Date(Date.now() + TOKENS_CONFIG.cookie.expiresIn),
		secure: req.secure || req.headers["x-forwarded-proto"] === "https",
		httpOnly: true,
		sameSite: "strict",
	});

	// 3. Remove password from output
	const userWithoutPassword = { ...user, password: undefined };

	// 4. Send response
	utilSendResJson({
		res,
		statusCode,
		user: userWithoutPassword,
		accessToken: tokens.accessToken,
		refreshToken: tokens.refreshToken,
	});
};

// Controller
export default class ControllerAuth {
	static readonly signup = utilCatchAsync(async (req, res) => {
		// 1. Create user
		const user = await ModelUser.create(
			utilGetFieldFromReqBody(req, ["email", "password", "passwordConfirm"]),
		);

		// 2. Send welcome email
		// await utilMailer.sendWelcomeEmail({
		// 	name: user.email.split("@")[0], // Use part of email as name
		// 	to: user.email,
		// });

		// 3. Send token response
		createSendToken({ req, res, statusCode: 200, user });
	});

	//
	static readonly login = utilCatchAsync(async (req, res, next) => {
		const { email, password } = req.body;

		// 1. Check if email and password exist
		if (!email || !password) {
			utilSendResJson({
				res,
				statusCode: 400,
				message: "Please provide email and password",
			});
			return;
		}

		// 2. Check if user exists && password is correct
		const user = await ModelUser.findOne({ email }).select("+password");
		if (!user) {
			next(new UtilAppError(401, "Incorrect email or password"));
			return;
		}
		const compared = await user.getIsCorrectPassword(password);
		if (!compared) {
			next(new UtilAppError(401, "Incorrect email or password"));
			return;
		}

		// 3. If everything ok, send token to client
		createSendToken({ req, res, statusCode: 200, user });
	});

	//
	static readonly logout = utilCatchAsync(async (req, res) => {
		// Clear cookies
		res.cookie("accessToken", null, {
			expires: new Date(Date.now() + 1000), // Expire immediately
			httpOnly: true,
		});
		res.cookie("refreshToken", null, {
			expires: new Date(Date.now() + 1000),
			httpOnly: true,
		});
		utilSendResJson({
			res,
			statusCode: 200,
			message: "Successfully logged out",
		});
	});

	//
	static readonly refreshToken = utilCatchAsync(async (req, res) => {
		const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;
		if (!refreshToken) {
			utilSendResJson({
				res,
				statusCode: 401,
				message: "Refresh token required",
			});
			return;
		}
		try {
			// Verify refresh token
			const decoded = verifyToken(refreshToken, "refresh");

			// Check if user still exists
			const user = await ModelUser.findById(decoded.id);
			if (!user) {
				utilSendResJson({
					res,
					statusCode: 401,
					message: "User belonging to this token no longer exists",
				});
				return;
			}

			// Generate new tokens
			createSendToken({ req, res, statusCode: 200, user });
		} catch (error) {
			utilSendResJson({
				res,
				statusCode: 401,
				message: "Invalid refresh token",
			});
			return;
		}
	});

	//
	static readonly getMe = utilCatchAsync(async (req, res) => {
		const user = req._user;
		utilSendResJson({
			res,
			statusCode: 200,
			user,
		});
	});

	//
	static readonly protect = utilCatchAsync(async (req, res, next) => {
		const accessToken = req.cookies.accessToken;
		if (!accessToken) {
			next(new UtilAppError(401, "You need to be logged in to get access to the resource"));
			return;
		}

		//
		let accessTokenDecoded: TVerifyToken<"access">;
		try {
			accessTokenDecoded = verifyToken(accessToken, "access");
		} catch (error) {
			next(new UtilAppError(401, "Invalid token. Please log in again"));
			return;
		}
		if (accessTokenDecoded.exp < Date.now() / 1000) {
			next(new UtilAppError(401, "Your token has expired. Please log in again"));
			return;
		}

		//
		const refreshToken = req.cookies.refreshToken;
		let refreshTokenDecoded: TVerifyToken<"refresh">;
		try {
			refreshTokenDecoded = verifyToken(refreshToken, "refresh");
		} catch (error) {
			next(new UtilAppError(401, "Invalid refresh token. Please update your token"));
			return;
		}
		if (refreshTokenDecoded.exp < Date.now() / 1000) {
			next(new UtilAppError(401, "Your refresh token has expired. update your token"));
			return;
		}

		// 3. Check if user still exists
		const user = await ModelUser.findById(accessTokenDecoded.id);
		if (!user) {
			utilSendResJson({
				res,
				statusCode: 401,
				message: "The user belonging to this token no longer exists",
			});
			return;
		}

		// 4. Grant access to protected route
		req._user = user;
		next();
	});
}
