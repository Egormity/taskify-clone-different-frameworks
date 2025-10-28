import cors from "cors";
import morgan from "morgan";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import hpp from "hpp";

import UtilAppError from "./utils/utilAppError";

import routesAuth from "./routes/routesAuth";

// Create express app
const app = express();

// Enable trust proxy
app.enable("trust proxy");

// Enable cors
app.use(cors());
app.options("*", cors());

// Development logging requests
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

// Set security http
app.use(
	helmet({
		contentSecurityPolicy: {
			directives: {
				defaultSrc: ["'self'"],
				connectSrc: ["'self'", "http://127.0.0.1:3000"],
			},
		},
	}),
);

// Limit amount of requests
app.use(
	"/api",
	rateLimit({
		max: 100,
		windowMs: 1000 * 60,
		message: "Too many requests from this IP. Try again later",
	}),
);

// Enable json responses
app.use(express.json({ limit: "100kb" }));

// Data sanitization against noSQL query injection
app.use(mongoSanitize());

// Prevent parameters pollution
app.use(hpp());

// Compress responses
app.use(compression());

// Routes
app.use("/api/v1/auth", routesAuth);

// Route not found
app.all("*", (req, res, next) => {
	next(new UtilAppError(`${req.originalUrl} not found`, 404));
});

// Default export the app
module.exports = app;
