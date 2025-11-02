import mongoose, { Document } from "mongoose";
import { EModels } from "../constants/constants.models";

export type TBillingPlan = Document & {
	name: string;
	price: number;
	duration: "monthly";
};

export const schemaBillingPlan = new mongoose.Schema<TBillingPlan>(
	{
		name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		duration: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);

export default mongoose.model(EModels.BILLING_PLAN, schemaBillingPlan);
