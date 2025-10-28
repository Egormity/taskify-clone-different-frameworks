const dotenv = require("dotenv");
const mongoose = require("mongoose");

//
process.on("uncaughtException", err => {
	console.log(err.name, err.message);
	console.log(err.stack);
	console.log("Uncaught rejection 💥 Shutting down the server...");
	process.exit(1);
});

//
dotenv.config({ path: "../.env" });
const app = require("./app");

//
const MONGODB_URL_FORMATTED = process.env.MONGODB_URI!.replace(
	"<db_password>",
	process.env.MONGODB_PASSWORD!,
);
mongoose
	.connect(MONGODB_URL_FORMATTED, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => console.log("MongoDB connection successful"));

//
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
	console.log(`App running on port ${PORT} with ${process.env.NODE_ENV} mode`);
});

//
process.on("unhandledRejection", err => {
	console.log(err.name, err.message);
	console.log("unhandledRejection 💥 Shutting down the server...");
	server.close(() => process.exit(1));
});

//
process.on("SIGTERM", err => {
	console.log(err.name, err.message);
	console.log("SIGTERM 👍 Shutting down the server...");
	server.close(() => console.log("Process terminated"));
});
