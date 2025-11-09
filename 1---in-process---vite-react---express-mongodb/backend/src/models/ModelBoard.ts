import mongoose, { Document } from "mongoose";
import { ENUM_MODELS } from "../constants/constants.models";

//
export type TBoard = Document & {
	name: string;
	workspaceId: string;
};

//
export const schemaBoard = new mongoose.Schema<TBoard>(
	{
		name: {
			type: String,
			required: true,
		},
		workspaceId: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);

//
export default mongoose.model<TBoard>(ENUM_MODELS.BOARD, schemaBoard);
