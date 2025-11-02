import { Response, NextFunction } from "express-serve-static-core";
import { TRequest } from "../types";

export default (func: (req: TRequest, res: Response, next: NextFunction) => Promise<void>) =>
	(req: TRequest, res: Response, next: NextFunction) =>
		func(req, res, next).catch(next);
