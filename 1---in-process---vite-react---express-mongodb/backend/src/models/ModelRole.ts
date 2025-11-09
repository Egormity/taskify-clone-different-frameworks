import mongoose, { Document } from "mongoose";
import { ENUM_MODELS } from "../constants/constants.models";

//
type TWorkspaceModuleName = "boards" | "activity" | "settings" | "billing";
export type TRole = Document & {
	name: "owner" | "user" | "userAdvanced" | "admin";
	availableModules: Array<TWorkspaceModuleName>;
};

//
export const schemaRole = new mongoose.Schema<TRole>(
	{
		name: {
			type: String,
			required: true,
			enum: ["owner", "user", "userAdvanced", "admin"],
		},
		availableModules: {
			type: [String],
			required: true,
			enum: ["boards", "activity", "settings", "billing"],
		},
	},
	{ timestamps: true },
);

//
export default mongoose.model<TRole>(ENUM_MODELS.ROLE, schemaRole);
