import ModelActivity from "../models/ModelActivity";
import UtilControllerBase from "../utils/UtilControllerBase";

export default class ControllerActivity {
	static readonly getMany = UtilControllerBase.getMany({ Model: ModelActivity });
	static readonly getOneById = UtilControllerBase.getOneById({ Model: ModelActivity });
}
