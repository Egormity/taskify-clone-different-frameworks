import { TUser } from "@app/api/api/user/types";

import { NullUndefinedAble } from "@shared/types/types.shared";

//
export type TExtractUrlParams<T extends string> = T extends `${string}/:${infer Param}/${infer Rest}`
	? Param | TExtractUrlParams<`/${Rest}`>
	: T extends `${string}/:${infer Param}`
		? Param
		: "";

//
export type TExtractUrlParamsRecord<TUrl extends string> = Record<
	TExtractUrlParams<TUrl>,
	NullUndefinedAble<string>
>;

//
export type TResponseWrapper<TData> = {
	data: TData;
	statusCode: number;
	status?: string;
	message?: string;
	user?: TUser;
	accessToken?: string;
	refreshToken?: string;
	stack?: string;
};
