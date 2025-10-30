import crypto from "crypto";
import mongoose, { Document, Query } from "mongoose";
import bcrypt from "bcryptjs";

//

//
export type TUser = Document & {
	_id: string;
	email: string;
	password: string;
	passwordConfirm: string;
	passwordChangedAt: number;
	active: boolean;
	getIsCorrectPassword: (providedPassword: string) => Promise<boolean>;
	getChangedPasswordAfter: (JWTTimestamp: number) => boolean;
};

export type TUserSelectedFields = {
	_id: string;
	email: string;
};

//
export const schemaUser = new mongoose.Schema<TUser>(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			select: false,
		},
		passwordConfirm: {
			type: String,
			required: true,
			validate: function (passwordConfirm: string) {
				return passwordConfirm === this.password;
			},
			select: false,
		},
		passwordChangedAt: Number,
		active: {
			type: Boolean,
			default: true,
			select: false,
		},
	},
	{ timestamps: true },
);

//
schemaUser.pre(/^find/, function (next) {
	(this as Query<TUser, TUser>).find({ active: { $ne: false } });
	next();
});

//
schemaUser.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
		return;
	}
	this.password = await bcrypt.hash(this.password, 12);
	this.passwordConfirm = "";
	this.passwordChangedAt = Date.now() - 1000 * 60;
	next();
});

//
schemaUser.methods.getIsCorrectPassword = async function (providedPassword: string) {
	return await bcrypt.compare(providedPassword, this.password);
};

//
schemaUser.methods.getChangedPasswordAfter = function (JWTTimestamp: number) {
	// 1. If an old user has never changed the password
	if (!this.passwordChangedAt) return false;

	// 2. If token time if before the passwordChangedAt return true
	if (new Date(this.passwordChangedAt).getTime() > JWTTimestamp * 1000) return true;

	// 3. If ok return not changed
	return false;
};

//
export default mongoose.model<TUser>("MODEL_USER", schemaUser);
