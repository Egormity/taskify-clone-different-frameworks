import mongoose, { Document } from "mongoose";

export type TBoard = Document & {
	name: string;
	workspaceId: string;
};

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

export default mongoose.model("MODEL_BOARD", schemaBoard);
