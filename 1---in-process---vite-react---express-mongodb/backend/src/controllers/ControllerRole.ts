import ModelRole from "../models/ModelRole";
import UtilControllerBase from "../utils/UtilControllerBase";

export default class ControllerRole {
	static readonly getMany = UtilControllerBase.getMany({ Model: ModelRole });
	static readonly getOneById = UtilControllerBase.getOneById({ Model: ModelRole });
}
