export const PagePrivacyPolicy = () => {
	return (
		<div className="m-5 mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg">
			{/* <!-- Header --> */}
			<header className="border-primary-300 border-b-2 py-8 text-center">
				<h1 className="text-primary-700 mb-2 text-4xl font-bold">Privacy Policy</h1>
				<p className="text-xl text-stone-600">Taskify - Your Personal Task Management App</p>
			</header>

			{/* <!-- Last Updated --> */}
			<div className="bg-primary-50 my-6 rounded-lg p-4">
				<p className="text-primary-700 font-semibold">🤖 AI-generated</p>
			</div>

			{/* <!-- Introduction --> */}
			<section className="mb-8">
				<h2 className="text-primary-700 mb-4 text-2xl font-bold">Introduction</h2>
				<p className="mb-4 text-stone-700">
					Welcome to Taskify! This Privacy Policy explains how we collect, use, and protect your information
					when you use our task management application.
				</p>
				<p className="text-stone-700">
					Taskify is a personal project designed to help you organize your tasks and boost productivity. We
					are committed to protecting your privacy and being transparent about our data practices.
				</p>
			</section>

			{/* <!-- Information We Collect --> */}
			<section className="mb-8">
				<h2 className="text-primary-700 mb-4 text-2xl font-bold">Information We Collect</h2>
				<div className="mb-4">
					<h3 className="mb-2 text-xl font-medium text-stone-800">Personal Information</h3>
					<ul className="list-inside list-disc space-y-1 text-stone-700">
						<li>Email address</li>
						<li>Username</li>
						<li>Password (encrypted)</li>
						<li>Profile information (optional)</li>
					</ul>
				</div>
				<div className="mb-4">
					<h3 className="mb-2 text-xl font-medium text-stone-800">Task Data</h3>
					<ul className="list-inside list-disc space-y-1 text-stone-700">
						<li>Task titles and descriptions</li>
						<li>Due dates and reminders</li>
						<li>Task status (completed/in progress)</li>
						<li>Categories and labels</li>
						<li>Board and list organizations</li>
					</ul>
				</div>
				<div>
					<h3 className="mb-2 text-xl font-medium text-stone-800">Technical Information</h3>
					<ul className="list-inside list-disc space-y-1 text-stone-700">
						<li>IP address</li>
						<li>Browser type and version</li>
						<li>Device information</li>
						<li>Usage patterns and analytics</li>
					</ul>
				</div>
			</section>

			{/* <!-- How We Use Your Information --> */}
			<section className="mb-8">
				<h2 className="text-primary-700 mb-4 text-2xl font-bold">How We Use Your Information</h2>
				<div className="grid gap-4 md:grid-cols-2">
					<div className="rounded-lg bg-stone-50 p-4">
						<h4 className="mb-2 font-semibold text-stone-800">🔐 Account Management</h4>
						<p className="text-stone-700">Create and maintain your user account</p>
					</div>
					<div className="rounded-lg bg-stone-50 p-4">
						<h4 className="mb-2 font-semibold text-stone-800">📋 Task Management</h4>
						<p className="text-stone-700">Store and organize your tasks and boards</p>
					</div>
					<div className="rounded-lg bg-stone-50 p-4">
						<h4 className="mb-2 font-semibold text-stone-800">🛠️ Service Improvement</h4>
						<p className="text-stone-700">Enhance app functionality and user experience</p>
					</div>
					<div className="rounded-lg bg-stone-50 p-4">
						<h4 className="mb-2 font-semibold text-stone-800">📞 Customer Support</h4>
						<p className="text-stone-700">Provide help and respond to inquiries</p>
					</div>
				</div>
			</section>

			{/* <!-- Data Storage and Security --> */}
			<section className="mb-8">
				<h2 className="text-primary-700 mb-4 text-2xl font-bold">Data Storage and Security</h2>
				<div className="rounded-lg border border-green-200 bg-green-50 p-4">
					<h3 className="mb-2 text-lg font-semibold text-green-800">🔒 Your Data is Safe With Us</h3>
					<ul className="space-y-2 text-green-700">
						<li>• All passwords are encrypted using bcrypt</li>
						<li>• Data is stored in secure MongoDB databases</li>
						<li>• HTTPS encryption for all data transmission</li>
						<li>• Regular security updates and monitoring</li>
						<li>• Limited access to authorized personnel only</li>
					</ul>
				</div>
			</section>

			{/* <!-- Data Sharing --> */}
			<section className="mb-8">
				<h2 className="text-primary-700 mb-4 text-2xl font-bold">Data Sharing</h2>
				<div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
					<p className="mb-2 font-semibold text-yellow-800">We Do Not:</p>
					<ul className="space-y-1 text-yellow-700">
						<li>• Sell your personal information to third parties</li>
						<li>• Share your task data with advertisers</li>
						<li>• Use your data for marketing purposes without consent</li>
					</ul>
				</div>
				<p className="mt-4 text-stone-700">
					We may share anonymized, aggregated data for analytical purposes, but this cannot be used to
					identify individual users.
				</p>
			</section>

			{/* <!-- Your Rights --> */}
			<section className="mb-8">
				<h2 className="text-primary-700 mb-4 text-2xl font-bold">Your Rights</h2>
				<div className="grid gap-4 md:grid-cols-2">
					<div className="rounded-lg border border-stone-200 p-4">
						<h4 className="mb-2 font-semibold text-stone-800">👁️ Access & View</h4>
						<p className="text-stone-700">View all your personal data we store</p>
					</div>
					<div className="rounded-lg border border-stone-200 p-4">
						<h4 className="mb-2 font-semibold text-stone-800">✏️ Update & Correct</h4>
						<p className="text-stone-700">Update your profile and preferences</p>
					</div>
					<div className="rounded-lg border border-stone-200 p-4">
						<h4 className="mb-2 font-semibold text-stone-800">🗑️ Delete Account</h4>
						<p className="text-stone-700">Permanently delete your account and data</p>
					</div>
					<div className="rounded-lg border border-stone-200 p-4">
						<h4 className="mb-2 font-semibold text-stone-800">📥 Data Export</h4>
						<p className="text-stone-700">Export your tasks and data</p>
					</div>
				</div>
			</section>

			{/* <!-- Cookies --> */}
			<section className="mb-8">
				<h2 className="text-primary-700 mb-4 text-2xl font-bold">Cookies and Tracking</h2>
				<p className="mb-4 text-stone-700">Taskify uses essential cookies for:</p>
				<ul className="list-inside list-disc space-y-1 text-stone-700">
					<li>User authentication and session management</li>
					<li>Remembering your preferences</li>
					<li>Security and fraud prevention</li>
					<li>Basic analytics to improve our service</li>
				</ul>
			</section>

			{/* <!-- Third-Party Services --> */}
			<section className="mb-8">
				<h2 className="text-primary-700 mb-4 text-2xl font-bold">Third-Party Services</h2>
				<p className="mb-4 text-stone-700">We use the following third-party services:</p>
				<div className="rounded-lg bg-stone-50 p-4">
					<ul className="space-y-2 text-stone-700">
						<li>
							• <span className="font-semibold">MongoDB:</span> Secure cloud database storage
						</li>
						<li>
							• <span className="font-semibold">Vercel/Netlify:</span> Frontend hosting (if applicable)
						</li>
						<li>
							• <span className="font-semibold">Authentication Services:</span> Secure user authentication
						</li>
					</ul>
				</div>
			</section>

			{/* <!-- Changes to Policy --> */}
			<section className="mb-8">
				<h2 className="text-primary-700 mb-4 text-2xl font-bold">Changes to This Policy</h2>
				<p className="text-stone-700">
					We may update this Privacy Policy from time to time. We will notify you of any significant changes
					by posting the new policy on this page and updating the "Last Updated" date.
				</p>
			</section>

			{/* <!-- Contact Information --> */}
			<section className="mb-8">
				<h2 className="text-primary-700 mb-4 text-2xl font-bold">Contact Us</h2>
				<div className="bg-primary-50 rounded-lg p-6">
					<p className="mb-4 text-stone-700">
						If you have any questions about this Privacy Policy or your data, please contact us:
					</p>
					<div className="space-y-2">
						<p className="text-stone-700">
							<span className="font-semibold">Email:</span> kotlaregor9@gmail.com
						</p>
						<p className="text-stone-700">
							<span className="font-semibold">GitHub:</span> github.com/egormity/taskify-different-frameworks
						</p>
					</div>
				</div>
			</section>

			{/* <!-- Footer --> */}
			<footer className="border-primary-300 border-t-2 py-6 text-center">
				<p className="text-stone-600">Thank you for trusting Taskify with your task management needs!</p>
				<p className="mt-2 text-sm text-stone-500">
					This is a personal project built for educational purposes.
				</p>
			</footer>
		</div>
	);
};
