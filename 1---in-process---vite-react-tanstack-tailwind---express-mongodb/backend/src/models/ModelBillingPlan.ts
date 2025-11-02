import mongoose, { Document } from "mongoose";
import { EModels } from "../constants/constants.models";

export type TBillingPlan = Document & {
	name: string;
	price: number;
	description: string;
};

export const schemaBillingPlan = new mongoose.Schema<TBillingPlan>(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		price: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);

export default mongoose.model(EModels.BILLING_PLAN, schemaBillingPlan);
