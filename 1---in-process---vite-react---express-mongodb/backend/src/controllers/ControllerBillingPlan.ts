import ModelBillingPlan from "../models/ModelBillingPlan";
import UtilControllerBase from "../utils/UtilControllerBase";

export default class ControllerBillingPlan {
	static readonly getMany = UtilControllerBase.getMany({ Model: ModelBillingPlan });
	static readonly getOneById = UtilControllerBase.getOneById({ Model: ModelBillingPlan });
}
