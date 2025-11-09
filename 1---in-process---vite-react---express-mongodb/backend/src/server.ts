// import path from "path";
// import dotenv from "dotenv";
import mongoose from "mongoose";

// Handle uncaught exceptions
process.on("uncaughtException", (err: unknown) => {
	if (err instanceof Error) {
		console.log(err.name, err.message);
		console.log(err.stack);
	} else console.log("Unknown uncaught exception:", err);
	console.log("Uncaught rejection 💥 Shutting down the server...");
	process.exit(1);
});

// Configure environment variables
// const result = dotenv.config({ path: path.resolve(__dirname, "../.env") });
// if (result.error) console.error("Error loading .env file:", result.error);
// else console.log(".env file loaded successfully");
// console.log(result.parsed);

// Import the app
import app from "./app";

// MongoDB connection
const MONGODB_URL_FORMATTED = process.env.MONGODB_URI!.replace(
	"<db_password>",
	process.env.MONGODB_PASSWORD!,
);

//
mongoose
	.connect(MONGODB_URL_FORMATTED)
	.then(() => console.log("MongoDB connection successful"))
	.catch((err: Error) => {
		console.error("MongoDB connection failed:", err.message);
		process.exit(1);
	});

// Start server
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
	console.log(`App running on port ${PORT} with ${process.env.NODE_ENV} mode`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", err => {
	console.log("Unhandled rejection:", err);
	console.log("unhandledRejection 💥 Shutting down the server...");
	server.close(() => process.exit(1));
});

// Handle SIGTERM signal
process.on("SIGTERM", err => {
	console.log(err);
	console.log("SIGTERM 👍 Shutting down the server...");
	server.close(() => console.log("Process terminated"));
});
