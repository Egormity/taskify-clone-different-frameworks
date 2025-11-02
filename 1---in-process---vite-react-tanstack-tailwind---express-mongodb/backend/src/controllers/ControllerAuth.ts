import ModelUser from "../models/ModelUser";
import utilCatchAsync from "../utils/utilCatchAsync";
import utilGetFieldsFromObject from "../utils/utilGetFieldsFromObject";
import utilMailer from "../utils/utilMailer";
import utilSendResJson from "../utils/utilSendResJson";
import UtilAppError from "../utils/UtilAppError";
import UtilAuthTokens, { TVerifyToken } from "../utils/UtilAuthTokens";

// Controller
export default class ControllerAuth {
	static readonly signup = utilCatchAsync(async (req, res) => {
		// 1. Create user
		const user = await ModelUser.create(
			utilGetFieldsFromObject(req.body, ["username", "email", "password", "passwordConfirm"]),
		);

		// TODO: 2. Send welcome email
		if (user.email && false)
			await utilMailer.sendWelcomeEmail({
				name: user.username,
				to: user.email,
			});

		// 3. Send token response
		UtilAuthTokens.createSendBothTokens({ req, res, statusCode: 200, user });
	});

	//
	static readonly login = utilCatchAsync(async (req, res, next) => {
		const { usernameOrEmail, password } = req.body;

		// 1. Check if email and password exist
		if (!usernameOrEmail || !password) {
			utilSendResJson({
				res,
				statusCode: 400,
				message: "Please provide username or email and password",
			});
			return;
		}

		// 2. Check if user exists && password is correct
		const user = await ModelUser.findOne({
			$or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
		}).select("+password");

		//
		if (!user) {
			next(new UtilAppError(401, "Incorrect email or password"));
			return;
		}

		//
		const compared = await user.getIsCorrectPassword(password);
		if (!compared) {
			next(new UtilAppError(401, "Incorrect email or password"));
			return;
		}

		// 3. If everything ok, send token to client
		UtilAuthTokens.createSendBothTokens({
			req,
			res,
			statusCode: 200,
			user,
			message: `Successfully logged in as ${user.username}`,
		});
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
	static readonly updateRefreshToken = utilCatchAsync(async (req, res) => {
		const accessToken = req.cookies?.accessToken;
		if (!accessToken) {
			utilSendResJson({
				res,
				statusCode: 401,
				message: "Access token required",
			});
			return;
		}
		try {
			// Verify refresh token
			const decoded = UtilAuthTokens.verifyAccessToken(accessToken);

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
			UtilAuthTokens.crateSendRefreshToken({ req, res, statusCode: 200, user: user.toObject() });
		} catch (error) {
			utilSendResJson({
				res,
				statusCode: 401,
				message: "Invalid access token",
			});
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
			accessTokenDecoded = UtilAuthTokens.verifyAccessToken(accessToken);
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
			refreshTokenDecoded = UtilAuthTokens.verifyRefreshToken(refreshToken);
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
