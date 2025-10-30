import { Request } from "express";

export default (req: Request, fields: string[]): Record<string, unknown> =>
	fields.reduce((acc, field) => ({ ...acc, [field]: req.body[field] }), {});
