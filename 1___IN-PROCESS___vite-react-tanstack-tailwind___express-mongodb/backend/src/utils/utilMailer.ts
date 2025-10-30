import nodemailer, { Transporter, SendMailOptions, SentMessageInfo } from "nodemailer";

export type TEmailOptions = {
	to: string;
	subject: string;
	html: string;
	text?: string;
};

export type TWelcomeEmailOptions = {
	to: string;
	name: string;
	verificationUrl?: string;
};

export type TEmailResponse = {
	success: boolean;
	messageId: string;
	previewUrl?: string;
};

class UtilMailer {
	private transporter: Transporter | null = null;
	private isInitialized: boolean = false;

	constructor() {
		this.init();
	}

	/**
	 * Initialize the email transporter
	 */
	private readonly init = async (): Promise<void> => {
		try {
			// For development - using Ethereal email test service
			if (process.env.NODE_ENV === "development") {
				const testAccount = await nodemailer.createTestAccount();
				this.transporter = nodemailer.createTransport({
					host: "smtp.ethereal.email",
					port: 587,
					secure: false,
					auth: {
						user: testAccount.user,
						pass: testAccount.pass,
					},
				});
			}
			// For production - using real email service
			else {
				this.transporter = nodemailer.createTransport({
					host: process.env.SMTP_HOST || "smtp.gmail.com",
					port: parseInt(process.env.SMTP_PORT || "587"),
					secure: false,
					auth: {
						user: process.env.SMTP_USER,
						pass: process.env.SMTP_PASS, // Use app password for Gmail
					},
				});
			}

			// Verify transporter configuration
			if (this.transporter) {
				await this.transporter.verify();
				this.isInitialized = true;
				console.log("Email service initialized successfully");
			}
		} catch (error) {
			console.log("Failed to initialize email service:", error);
			this.isInitialized = false;
		}
	};

	/**
	 * Check if email service is ready
	 * @returns boolean indicating if service is initialized
	 */
	readonly getIsReady = (): boolean => this.isInitialized;

	/**
	 * Get transporter instance (for testing or advanced use cases)
	 * @returns Transporter instance or null
	 */
	readonly getTransporter = (): Transporter | null => this.transporter;

	/**
	 * Generic email sending method
	 * @param mailOptions - Email options
	 * @returns Promise with email response
	 */
	public readonly sendEmail = async (mailOptions: TEmailOptions): Promise<TEmailResponse> => {
		if (!this.getIsReady() || !this.transporter) throw new Error("Email service not initialized");
		const options: SendMailOptions = {
			from: process.env.SENDER_EMAIL || '"Taskify" <noreply@taskify.com>',
			...mailOptions,
		};
		try {
			const info: SentMessageInfo = await this.transporter.sendMail(options);
			if (process.env.NODE_ENV === "development")
				console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
			return {
				success: true,
				messageId: info.messageId,
				previewUrl:
					process.env.NODE_ENV === "development"
						? nodemailer.getTestMessageUrl(info) || undefined
						: undefined,
			};
		} catch (error) {
			console.error("Error sending email:", error);
			throw new Error(`Failed to send email: ${error instanceof Error ? error.message : "Unknown error"}`);
		}
	};

	/**
	 * Send welcome email to new user
	 * @param options - Welcome email options
	 * @returns Promise with email response
	 */
	public readonly sendWelcomeEmail = async (options: TWelcomeEmailOptions): Promise<TEmailResponse> => {
		if (!this.isInitialized || !this.transporter) throw new Error("Email service not initialized");
		return this.sendEmail({
			// from: process.env.FROM_EMAIL || '"Taskify" <noreply@taskify.com>',
			to: options.to,
			subject: "Welcome to Our App!",
			text: `
				Welcome to Taskify, ${options.name}!
				
				We're excited to have you on board! Your account has been successfully created.
				
				With Taskify, you can:
				- Organize your tasks efficiently
				- Collaborate with your team
				- Track your progress
				- Set reminders and deadlines
				
				${options.verificationUrl ? `Please verify your email address by visiting: ${options.verificationUrl}` : ""}
				
				If you have any questions, feel free to reply to this email.
				
				Happy task managing!
				
				© ${new Date().getFullYear()} Taskify. All rights reserved.
			`,
			html: `
				<!DOCTYPE html>
				<html>
					<head>
						<style>
						body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
						.container { max-width: 600px; margin: 0 auto; padding: 20px; }
						.header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
						.content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
						.button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
						.footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
						</style>
					</head>
					<body>
						<div class="container">
						<div class="header">
							<h1>Welcome to Taskify!</h1>
						</div>
						<div class="content">
							<h2>Hello ${options.name},</h2>
							<p>We're excited to have you on board! Your account has been successfully created.</p>
							<p>With Taskify, you can:</p>
							<ul>
								<li>Organize your tasks efficiently</li>
								<li>Collaborate with your team</li>
								<li>Track your progress</li>
								<li>Set reminders and deadlines</li>
							</ul>
							${
								options.verificationUrl
									? `
								<p>Please verify your email address to get started:</p>
								<a href="${options.verificationUrl}" class="button">Verify Email Address</a>
								<p>Or copy this link: ${options.verificationUrl}</p>
							`
									: ""
							}
							<p>If you have any questions, feel free to reply to this email.</p>
							<p>Happy task managing! 🎉</p>
						</div>
						<div class="footer">
							<p>&copy; ${new Date().getFullYear()} Taskify. All rights reserved.</p>
						</div>
						</div>
					</body>
				</html>
			`,
		});
	};
}

// Create singleton instance
export default new UtilMailer();
