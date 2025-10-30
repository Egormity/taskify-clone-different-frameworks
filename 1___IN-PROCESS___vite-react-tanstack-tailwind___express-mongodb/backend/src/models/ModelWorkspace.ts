import mongoose, { Document } from "mongoose";

export type TWorkspace = Document & {
	name: string;
	billingPlan: mongoose.Schema.Types.ObjectId;
	members: mongoose.Schema.Types.ObjectId[];
};

export const schemaWorkspace = new mongoose.Schema<TWorkspace>(
	{
		name: {
			type: String,
			required: true,
		},
		billingPlan: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "MODEL_BILLING_PLAN",
		},
		members: {
			type: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "SCHEMA_USER",
				},
			],
			validate: {
				validator: function (members: mongoose.Types.ObjectId[]) {
					return members && members.length > 0;
				},
			},
			required: true,
		},
	},
	{ timestamps: true },
);

export default mongoose.model("MODEL_WORKSPACE", schemaWorkspace);
