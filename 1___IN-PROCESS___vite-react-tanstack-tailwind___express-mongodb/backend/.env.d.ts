// types/env.d.ts
declare namespace NodeJS {
	interface ProcessEnv {
		PORT: string;
		NODE_ENV: string;

		JWT_ACCESS_EXPIRES_IN: string;
		JWT_REFRESH_EXPIRES_IN: string;
		JWT_COOKIE_EXPIRES_IN_DAYS: string;
		JWT_ACCESS_SECRET: string;
		JWT_REFRESH_SECRET: string;

		MONGODB_USERNAME: string;
		MONGODB_PASSWORD: string;
		MONGODB_URI: string;

		SMTP_HOST: string;
		SMTP_PORT: string;
		SMTP_USER: string;
		SMTP_PASS: string;
		SENDER_EMAIL: string;
	}
}
