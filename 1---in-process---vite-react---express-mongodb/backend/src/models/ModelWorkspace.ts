import mongoose, { Document } from "mongoose";
import { ENUM_MODELS } from "../constants/constants.models";

//
export type TWorkspace = Document & {
	name: string;
	billingPlan: mongoose.Schema.Types.ObjectId;
	members: Array<{
		user: mongoose.Schema.Types.ObjectId;
		role: mongoose.Schema.Types.ObjectId;
	}>;
	boards: Array<mongoose.Schema.Types.ObjectId>;
};

//
export const schemaWorkspace = new mongoose.Schema<TWorkspace>(
	{
		name: {
			type: String,
			required: true,
		},
		billingPlan: {
			type: mongoose.Schema.Types.ObjectId,
			ref: ENUM_MODELS.BILLING_PLAN,
			required: true,
		},
		members: {
			type: [
				{
					user: {
						type: mongoose.Schema.Types.ObjectId,
						ref: ENUM_MODELS.USER,
					},
					role: {
						type: mongoose.Schema.Types.ObjectId,
						ref: ENUM_MODELS.ROLE,
					},
				},
			],
			minLength: 2,
			required: true,
		},
		boards: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: ENUM_MODELS.BOARD,
			},
		],
	},
	{ timestamps: true },
);

//
export default mongoose.model<TWorkspace>(ENUM_MODELS.WORKSPACE, schemaWorkspace);
