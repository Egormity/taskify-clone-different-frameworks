export type TSignup = {
	username: string;
	email?: string;
	password: string;
	passwordConfirm: string;
};

export type TLogin = {
	usernameOrEmail: string;
	password: string;
};
