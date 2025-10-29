export type TUser = {
	_id: string;
	email: string;
};

export type TUserPost = {
	email: string;
	password: string;
	passwordConfirm: string;
};

export type TUserPatch = {
	email: string;
	password: string;
};
