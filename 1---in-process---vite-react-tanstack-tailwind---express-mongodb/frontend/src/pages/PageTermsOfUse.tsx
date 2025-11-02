export const PageTermsOfUse = () => {
	return (
		<div className="m-5 mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg">
			{/* <!-- Header --> */}
			<header className="border-primary-500 border-b-2 py-8 text-center">
				<h1 className="text-primary-700 mb-2 text-4xl font-bold">Terms of Use</h1>
				<p className="text-xl text-gray-600">Taskify - Your Personal Task Management App</p>
			</header>

			{/* <!-- Last Updated --> */}
			<div className="bg-primary-50 my-6 rounded-lg p-4">
				<p className="text-primary-700 font-semibold">🤖 AI-generated</p>
			</div>

			{/* <!-- Introduction --> */}
			<section className="mb-8">
				<h2 className="text-primary-700 mb-4 text-2xl font-bold">Introduction</h2>
				<p className="mb-4 text-gray-700">
					Welcome to Taskify! These Terms of Use govern your use of our task management application and
					services.
				</p>
				<p className="text-gray-700">
					By accessing or using Taskify, you agree to be bound by these terms. If you disagree with any part
					of these terms, you may not access our service.
				</p>
			</section>

			{/* <!-- Acceptance of Terms --> */}
			<section className="mb-8">
				<h2 className="text-primary-700 mb-4 text-2xl font-bold">Acceptance of Terms</h2>
				<p className="mb-4 text-gray-700">
					By creating an account or using Taskify, you acknowledge that you have read, understood, and agree
					to be bound by these Terms of Use and our Privacy Policy.
				</p>
				<div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
					<p className="text-blue-700">
						<strong>Note:</strong> Taskify is a personal project built for educational purposes. While we
						strive to provide a reliable service, we cannot guarantee uninterrupted availability.
					</p>
				</div>
			</section>

			{/* <!-- User Accounts --> */}
			<section className="mb-8">
				<h2 className="text-primary-700 mb-4 text-2xl font-bold">User Accounts</h2>
				<div className="space-y-4">
					<div className="rounded-lg border border-gray-200 p-4">
						<h3 className="mb-2 text-xl font-medium text-gray-800">Account Creation</h3>
						<ul className="list-inside list-disc space-y-1 text-gray-700">
							<li>You must be at least 13 years old to use Taskify</li>
							<li>You must provide accurate and complete registration information</li>
							<li>You are responsible for maintaining the confidentiality of your password</li>
						</ul>
					</div>
					<div className="rounded-lg border border-gray-200 p-4">
						<h3 className="mb-2 text-xl font-medium text-gray-800">Account Responsibilities</h3>
						<ul className="list-inside list-disc space-y-1 text-gray-700">
							<li>You are responsible for all activities under your account</li>
							<li>You must notify us immediately of any unauthorized use</li>
							<li>We reserve the right to disable accounts that violate these terms</li>
						</ul>
					</div>
				</div>
			</section>

			{/* <!-- Acceptable Use --> */}
			<section className="mb-8">
				<h2 className="text-primary-700 mb-4 text-2xl font-bold">Acceptable Use</h2>
				<div className="grid gap-4 md:grid-cols-2">
					<div className="rounded-lg border border-green-200 bg-green-50 p-4">
						<h4 className="mb-2 font-semibold text-green-800">✅ You May:</h4>
						<ul className="space-y-1 text-green-700">
							<li>• Use Taskify for personal task management</li>
							<li>• Create and organize your tasks and boards</li>
							<li>• Invite collaborators to shared boards</li>
							<li>• Export your data for personal use</li>
						</ul>
					</div>
					<div className="rounded-lg border border-red-200 bg-red-50 p-4">
						<h4 className="mb-2 font-semibold text-red-800">❌ You May Not:</h4>
						<ul className="space-y-1 text-red-700">
							<li>• Use Taskify for illegal or unauthorized purposes</li>
							<li>• Upload malicious content or viruses</li>
							<li>• Attempt to hack or disrupt the service</li>
							<li>• Share inappropriate or harmful content</li>
							<li>• Impersonate others or provide false information</li>
						</ul>
					</div>
				</div>
			</section>

			{/* <!-- Intellectual Property --> */}
			<section className="mb-8">
				<h2 className="text-primary-700 mb-4 text-2xl font-bold">Intellectual Property</h2>
				<div className="space-y-4">
					<div className="rounded-lg bg-gray-50 p-4">
						<h3 className="mb-2 text-lg font-semibold text-gray-800">Taskify's Rights</h3>
						<p className="text-gray-700">
							The Taskify application, including its design, code, and branding, is the intellectual property
							of the Taskify developers. All rights reserved.
						</p>
					</div>
					<div className="rounded-lg bg-gray-50 p-4">
						<h3 className="mb-2 text-lg font-semibold text-gray-800">Your Content</h3>
						<p className="text-gray-700">
							You retain all rights to the tasks, notes, and content you create within Taskify. By using our
							service, you grant us the license to store and display your content solely for the purpose of
							providing the service.
						</p>
					</div>
				</div>
			</section>

			{/* <!-- Service Availability --> */}
			<section className="mb-8">
				<h2 className="text-primary-700 mb-4 text-2xl font-bold">Service Availability</h2>
				<div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
					<p className="text-yellow-700">
						<strong>Important:</strong> Taskify is provided as a personal project. We do not guarantee:
					</p>
					<ul className="mt-2 space-y-1 text-yellow-700">
						<li>• 100% uptime or uninterrupted service</li>
						<li>• Data backup guarantees (though we make reasonable efforts)</li>
						<li>• Long-term data retention</li>
						<li>• Commercial-grade reliability</li>
					</ul>
				</div>
				<p className="mt-4 text-gray-700">
					We recommend regularly exporting important data and maintaining your own backups.
				</p>
			</section>

			{/* <!-- Termination --> */}
			<section className="mb-8">
				<h2 className="text-primary-700 mb-4 text-2xl font-bold">Termination</h2>
				<p className="mb-4 text-gray-700">
					You may delete your Taskify account at any time through your account settings. Upon deletion:
				</p>
				<ul className="list-inside list-disc space-y-2 text-gray-700">
					<li>Your personal data and tasks will be permanently deleted</li>
					<li>This action cannot be undone</li>
					<li>We may retain certain information as required by law</li>
				</ul>
				<p className="mt-4 text-gray-700">
					We reserve the right to suspend or terminate accounts that violate these Terms of Use.
				</p>
			</section>

			{/* <!-- Limitation of Liability --> */}
			<section className="mb-8">
				<h2 className="text-primary-700 mb-4 text-2xl font-bold">Limitation of Liability</h2>
				<div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
					<p className="text-orange-700">
						<strong>Disclaimer:</strong> Taskify is provided "as is" without warranties of any kind. To the
						fullest extent permitted by law, we shall not be liable for:
					</p>
					<ul className="mt-2 space-y-1 text-orange-700">
						<li>• Any data loss or corruption</li>
						<li>• Service interruptions or downtime</li>
						<li>• Damages resulting from use of the service</li>
						<li>• Third-party actions or content</li>
					</ul>
				</div>
			</section>

			{/* <!-- Changes to Terms --> */}
			<section className="mb-8">
				<h2 className="text-primary-700 mb-4 text-2xl font-bold">Changes to Terms</h2>
				<p className="text-gray-700">
					We may update these Terms of Use from time to time. We will notify users of significant changes by
					posting the updated terms on this page and updating the effective date. Continued use of Taskify
					after changes constitutes acceptance of the new terms.
				</p>
			</section>

			{/* <!-- Governing Law --> */}
			<section className="mb-8">
				<h2 className="text-primary-700 mb-4 text-2xl font-bold">Governing Law</h2>
				<p className="text-gray-700">
					These Terms shall be governed by and construed in accordance with the laws of the jurisdiction
					where the service provider is established, without regard to its conflict of law provisions.
				</p>
			</section>

			{/* <!-- Contact Information --> */}
			<section className="mb-8">
				<h2 className="text-primary-700 mb-4 text-2xl font-bold">Contact Us</h2>
				<div className="bg-primary-50 rounded-lg p-6">
					<p className="mb-4 text-gray-700">
						If you have any questions about these Terms of Use, please contact us:
					</p>
					<div className="space-y-2">
						<p className="text-gray-700">
							<span className="font-semibold">Email:</span> kotlaregor9@gmail.com
						</p>
						<p className="text-gray-700">
							<span className="font-semibold">GitHub:</span> github.com/egormity/taskify-different-frameworks
						</p>
					</div>
				</div>
			</section>

			{/* <!-- Footer --> */}
			<footer className="border-t-2 border-gray-200 py-6 text-center">
				<p className="text-gray-600">Thank you for using Taskify!</p>
				<p className="mt-2 text-sm text-gray-500">
					These terms were last updated on {new Date().toLocaleDateString()}
				</p>
			</footer>
		</div>
	);
};
