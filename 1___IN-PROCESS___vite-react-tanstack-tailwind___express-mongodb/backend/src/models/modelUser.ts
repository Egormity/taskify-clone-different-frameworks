import mongoose, { Document, Query } from "mongoose";

export type TUser = Document & {
	_id: string;
	email: string;
	password: string;
	passwordConfirm: string;
	passwordChangedAt: Date;
	passwordResetToken: string;
	passwordResetExpires: Date;
	active: boolean;
	createdAt: Date;
};

export const schemaUser = new mongoose.Schema<TUser>({
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
	passwordChangedAt: {
		type: Date,
		default: Date.now(),
	},
	passwordResetToken: String,
	passwordResetExpires: Date,
	active: {
		type: Boolean,
		default: true,
		select: false,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

schemaUser.pre(/^find/, function (next) {
	(this as Query<TUser, TUser>).find({ active: { $ne: false } });
	next();
});

export default mongoose.model<TUser>("MODEL_USER", schemaUser);
