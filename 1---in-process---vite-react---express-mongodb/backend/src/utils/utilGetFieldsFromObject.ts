import { Request } from "express";

export default (obj: Record<string, unknown>, fields: string[]): Record<string, unknown> =>
	fields.reduce((acc, field) => ({ ...acc, [field]: obj[field] }), {});
