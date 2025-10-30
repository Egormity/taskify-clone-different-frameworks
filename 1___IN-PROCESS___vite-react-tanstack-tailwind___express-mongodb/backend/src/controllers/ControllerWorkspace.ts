import ModelWorkspace from "../models/ModelWorkspace";
import utilCatchAsync from "../utils/utilCatchAsync";
import UtilControllerBase from "../utils/UtilControllerBase";
import utilSendResJson from "../utils/utilSendResJson";

export default class ControllerWorkspace {
	static readonly getMyMany = utilCatchAsync(async (req, res) => {
		const data = await ModelWorkspace.find({ members: req._user?._id });
		utilSendResJson({ res, statusCode: 200, data });
	});
	static readonly getOneById = UtilControllerBase.getOneById({ Model: ModelWorkspace });
	static readonly postOne = UtilControllerBase.postOne({ Model: ModelWorkspace });
	static readonly patchOneById = UtilControllerBase.patchOneById({ Model: ModelWorkspace });
	static readonly deleteOneById = UtilControllerBase.deleteOneById({ Model: ModelWorkspace });
}
