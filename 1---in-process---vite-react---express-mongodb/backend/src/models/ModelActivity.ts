import mongoose, { Document } from "mongoose";
import { ENUM_MODELS } from "../constants/constants.models";

//
export type TActivity = Document & {
	name: string;
};

//
export const schemaActivity = new mongoose.Schema<TActivity>(
	{
		name: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);

//
export default mongoose.model<TActivity>(ENUM_MODELS.ACTIVITY, schemaActivity);
