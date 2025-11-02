import { Request, Response } from "express";
import { Model } from "mongoose";
import utilSendResJson from "./utilSendResJson";
import utilCatchAsync from "./utilCatchAsync";
import UtilAppError from "./UtilAppError";

//
export default class UtilControllerBase {
	static readonly getMany = <T>({ Model }: { Model: Model<T> }) =>
		utilCatchAsync(async (req, res) => {
			const data = await Model.find();
			utilSendResJson({ res, statusCode: 200, data });
		});

	//
	static readonly getOneById = <T>({ Model }: { Model: Model<T> }) =>
		utilCatchAsync(async (req, res, next) => {
			const data = await Model.findById(req.params.id);
			if (!data) return next(new UtilAppError(404, `No documents found with id: ${req.params.id}`));
			utilSendResJson({ res, statusCode: 200, data });
		});

	//
	static readonly postOne = <T>({ Model }: { Model: Model<T> }) =>
		utilCatchAsync(async (req, res) => {
			const data = await Model.create(req.body);
			utilSendResJson({ res, statusCode: 201, data });
		});

	//
	static readonly putOneById = <T>({ Model }: { Model: Model<T> }) =>
		utilCatchAsync(async (req, res, next) => {
			const data = await Model.findByIdAndUpdate(req.params.id, req.body, {
				new: true,
				runValidators: true,
			});
			if (!data) return next(new UtilAppError(404, `No documents found with id: ${req.params.id}`));
			utilSendResJson({ res, statusCode: 201, data });
		});

	//
	static readonly patchOneById = <T>({ Model }: { Model: Model<T> }) =>
		utilCatchAsync(async (req, res, next) => {
			const data = await Model.findByIdAndUpdate(req.params.id, req.body, {
				new: true,
				runValidators: true,
			});
			if (!data) return next(new UtilAppError(404, `No documents found with id: ${req.params.id}`));
			utilSendResJson({ res, statusCode: 201, data });
		});

	//
	static readonly deleteOneById = <T>({ Model }: { Model: Model<T> }) =>
		utilCatchAsync(async (req, res, next) => {
			const data = await Model.findByIdAndDelete(req.params.id);
			if (!data) return next(new UtilAppError(404, `No documents found with id: ${req.params.id}`));
			utilSendResJson({ res, statusCode: 204, data });
		});
}
