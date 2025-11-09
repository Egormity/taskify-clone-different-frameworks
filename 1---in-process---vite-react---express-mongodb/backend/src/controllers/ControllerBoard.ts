import ModelBoard from "../models/ModelBoard";
import UtilControllerBase from "../utils/UtilControllerBase";

export default class ControllerRole {
	static readonly getMany = UtilControllerBase.getMany({ Model: ModelBoard });
	static readonly getOneById = UtilControllerBase.getOneById({ Model: ModelBoard });
}
