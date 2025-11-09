import { Request, Response } from "express";
import { Model } from "mongoose";
import utilSendResJson, { TUtilSendResJsonProps } from "./utilSendResJson";
import utilCatchAsync from "./utilCatchAsync";
import UtilAppError from "./UtilAppError";

//
export default class UtilControllerBase {
	static readonly getMany = <T>({
		Model,
		utilSendResJsonProps,
	}: {
		Model: Model<T>;
		utilSendResJsonProps?: Partial<TUtilSendResJsonProps>;
	}) =>
		utilCatchAsync(async (req, res) => {
			const data = await Model.find();
			utilSendResJson({ res, statusCode: 200, data, ...utilSendResJsonProps });
		});

	//
	static readonly getOneById = <T>({
		Model,
		utilSendResJsonProps,
	}: {
		Model: Model<T>;
		utilSendResJsonProps?: Partial<TUtilSendResJsonProps>;
	}) =>
		utilCatchAsync(async (req, res, next) => {
			const data = await Model.findById(req.params.id);
			if (!data) return next(new UtilAppError(404, `No documents found with id: ${req.params.id}`));
			utilSendResJson({ res, statusCode: 200, data, ...utilSendResJsonProps });
		});

	//
	static readonly postOne = <T>({
		Model,
		utilSendResJsonProps,
	}: {
		Model: Model<T>;
		utilSendResJsonProps?: Partial<TUtilSendResJsonProps>;
	}) =>
		utilCatchAsync(async (req, res) => {
			const data = await Model.create(req.body);
			utilSendResJson({ res, statusCode: 201, data, ...utilSendResJsonProps });
		});

	//
	static readonly putOneById = <T>({
		Model,
		utilSendResJsonProps,
	}: {
		Model: Model<T>;
		utilSendResJsonProps?: Partial<TUtilSendResJsonProps>;
	}) =>
		utilCatchAsync(async (req, res, next) => {
			const data = await Model.findByIdAndUpdate(req.params.id, req.body, {
				new: true,
				runValidators: true,
			});
			if (!data) return next(new UtilAppError(404, `No documents found with id: ${req.params.id}`));
			utilSendResJson({ res, statusCode: 201, data, ...utilSendResJsonProps });
		});

	//
	static readonly patchOneById = <T>({
		Model,
		utilSendResJsonProps,
	}: {
		Model: Model<T>;
		utilSendResJsonProps?: Partial<TUtilSendResJsonProps>;
	}) =>
		utilCatchAsync(async (req, res, next) => {
			const data = await Model.findByIdAndUpdate(req.params.id, req.body, {
				new: true,
				runValidators: true,
			});
			if (!data) return next(new UtilAppError(404, `No documents found with id: ${req.params.id}`));
			utilSendResJson({ res, statusCode: 201, data, ...utilSendResJsonProps });
		});

	//
	static readonly deleteOneById = <T>({
		Model,
		utilSendResJsonProps,
	}: {
		Model: Model<T>;
		utilSendResJsonProps?: Partial<TUtilSendResJsonProps>;
	}) =>
		utilCatchAsync(async (req, res, next) => {
			const data = await Model.findByIdAndDelete(req.params.id);
			if (!data) return next(new UtilAppError(404, `No documents found with id: ${req.params.id}`));
			utilSendResJson({ res, statusCode: 204, data, ...utilSendResJsonProps });
		});
}
