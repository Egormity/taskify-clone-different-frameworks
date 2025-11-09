import ModelBillingPlan from "../models/ModelBillingPlan";
import ModelRole from "../models/ModelRole";
import ModelUser from "../models/ModelUser";
import ModelWorkspace from "../models/ModelWorkspace";

import UtilAppError from "../utils/UtilAppError";
import utilCatchAsync from "../utils/utilCatchAsync";
import UtilControllerBase from "../utils/UtilControllerBase";
import utilSendResJson from "../utils/utilSendResJson";

//
export default class ControllerWorkspace {
	static readonly getMyMany = utilCatchAsync(async (req, res) => {
		const workspaces = await ModelWorkspace.find({
			members: { $elemMatch: { user: req._user?._id } },
		}).lean();
		const roles = await ModelRole.find().lean();
		const data = workspaces.map(workspace => {
			const userMember = workspace.members.find(
				member => member.user?.toString() === req._user?._id?.toString(),
			);
			const userRole = roles.find(role => role._id?.toString() === userMember?.role?.toString());
			return { ...workspace, availableModules: userRole?.availableModules || [] };
		});
		utilSendResJson({ res, statusCode: 200, data });
	});

	//
	static readonly getOneById = UtilControllerBase.getOneById({ Model: ModelWorkspace });

	//
	static readonly postOne = utilCatchAsync(async (req, res, next) => {
		const user = await ModelUser.findOne(req._user?._id as any);
		if (!user) {
			next(new UtilAppError(404, "User not found"));
			return;
		}

		//
		const billingPlan = await ModelBillingPlan.findOne({ price: 0 });
		if (!billingPlan) {
			next(new UtilAppError(500, "Billing plan internal server error"));
			return;
		}

		//
		const roleOwner = await ModelRole.findOne({ name: "owner" });
		if (!roleOwner) {
			next(new UtilAppError(500, "Role internal server error"));
			return;
		}

		//
		const data = await ModelWorkspace.create({
			name: req.body.name,
			members: [{ user: user._id, role: roleOwner._id }],
			billingPlan: billingPlan._id,
		});
		await ModelUser.findByIdAndUpdate(user._id, {
			workspaces: [...user.workspaces, data._id],
		});
		utilSendResJson({ res, statusCode: 200, data, message: "Workspace created successfully" });
	});

	//
	static readonly patchOneById = UtilControllerBase.patchOneById({
		Model: ModelWorkspace,
		utilSendResJsonProps: { message: "Workspace updated successfully" },
	});

	//
	static readonly deleteOneById = UtilControllerBase.deleteOneById({
		Model: ModelWorkspace,
		utilSendResJsonProps: { message: "Workspace deleted successfully" },
	});
}
