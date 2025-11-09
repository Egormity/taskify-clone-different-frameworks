import cors from "cors";
import morgan from "morgan";
import express from "express";
// import rateLimit from "express-rate-limit";
import helmet from "helmet";
// import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import hpp from "hpp";
import cookieParser from "cookie-parser";

import UtilAppError from "./utils/UtilAppError";
import ControllerErrors from "./controllers/ControllerErrors";
import routerAuth from "./routers/routerAuth";
import routerActivity from "./routers/routerActivity";
import routerBillingPlan from "./routers/routerBillingPlan";
import routerBoard from "./routers/routerBoard";
import routerRole from "./routers/routerRole";
import routerWorkspace from "./routers/routerWorkspace";

// Create express app
const app = express();

// Enable trust proxy
app.enable("trust proxy");

// Enable cors
app.use(
	cors({
		origin: "http://localhost:5173",
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
		credentials: true,
	}),
);

// Development logging requests
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// Set security http
app.use(
	helmet({
		contentSecurityPolicy: {
			directives: {
				defaultSrc: ["'self'"],
				connectSrc: ["'self'", "http://127.0.0.1:5000"],
			},
		},
	}),
);

// Limit amount of requests
// app.use(
// 	"/api",
// 	rateLimit({
// 		max: 999,
// 		windowMs: 1000 * 60,
// 		message: "Too many requests from this IP. Try again later",
// 	}),
// );

// Enable json responses
app.use(express.json({ limit: "100kb" }));

// Data sanitization against noSQL query injection
// app.use(mongoSanitize());

// Prevent parameters pollution
app.use(hpp());

// Compress responses
app.use(compression());

// Add cookie parser middleware BEFORE your routes
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", routerAuth);
app.use("/api/v1/activity", routerActivity);
app.use("/api/v1/billing-plan", routerBillingPlan);
app.use("/api/v1/board", routerBoard);
app.use("/api/v1/role", routerRole);
app.use("/api/v1/workspace", routerWorkspace);

// Route not found
app.all(/.*/, (req, res, next) => next(new UtilAppError(404, `${req.originalUrl} not found`)));

// Middleware to handle errors
app.use(ControllerErrors);

// Default export the app
export default app;
