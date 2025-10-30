import { Request, Response } from "express";

import UtilControllerBase from "../utils/UtilControllerBase";
import ModelUser from "../models/ModelUser123";

export default class ControllerUsers {
	static readonly getAll = UtilControllerBase.getAll({ Model: ModelUser });
	static readonly getOneById = UtilControllerBase.getOneById({ Model: ModelUser });
	static readonly postOne = UtilControllerBase.postOne({ Model: ModelUser });
	static readonly patchOneById = UtilControllerBase.patchOneById({ Model: ModelUser });
	static readonly deleteOneById = UtilControllerBase.deleteOneById({ Model: ModelUser });
}
