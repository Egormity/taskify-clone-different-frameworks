import ModelBillingPlan from "../models/ModelBillingPlan";
import ModelWorkspace from "../models/ModelWorkspace";
import UtilAppError from "../utils/UtilAppError";
import utilCatchAsync from "../utils/utilCatchAsync";
import UtilControllerBase from "../utils/UtilControllerBase";
import utilSendResJson from "../utils/utilSendResJson";

export default class ControllerWorkspace {
	static readonly getMyMany = utilCatchAsync(async (req, res) => {
		const data = await ModelWorkspace.find({ members: req._user?._id });
		utilSendResJson({ res, statusCode: 200, data });
	});
	static readonly getOneById = UtilControllerBase.getOneById({ Model: ModelWorkspace });
	static readonly postOne = utilCatchAsync(async (req, res, next) => {
		const billingPlan = await ModelBillingPlan.findOne({ price: 0 });
		if (!billingPlan) {
			next(new UtilAppError(500, "Billing plan server error"));
			return;
		}
		const data = await ModelWorkspace.create({
			name: req.body.name,
			members: [req._user?._id],
			billingPlan: billingPlan._id,
		});
		utilSendResJson({ res, statusCode: 200, data });
	});
	static readonly patchOneById = UtilControllerBase.patchOneById({ Model: ModelWorkspace });
	static readonly deleteOneById = UtilControllerBase.deleteOneById({ Model: ModelWorkspace });
}
