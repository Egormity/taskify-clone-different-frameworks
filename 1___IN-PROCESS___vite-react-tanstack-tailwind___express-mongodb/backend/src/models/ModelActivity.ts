import mongoose, { Document } from "mongoose";

export type TActivity = Document & {
	name: string;
};

export const schemaActivity = new mongoose.Schema<TActivity>(
	{
		name: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);

export default mongoose.model("MODEL_ACTIVITY", schemaActivity);
