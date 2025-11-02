export type Nullable<T> = T | null;
export type UndefinedAble<T> = T | undefined;
export type NullUndefinedAble<T> = T | null | undefined;
export type NullUndefinedBooleanAble<T> = T | null | undefined | boolean;

//
export type RecursivePartial<T> = {
	[P in keyof T]?: T[P] extends (infer U)[]
		? RecursivePartial<U>[]
		: T[P] extends object | undefined
			? RecursivePartial<T[P]>
			: T[P];
};

//
export type RecursiveConditional<T, TYPES> =
	T extends Array<infer U>
		? Array<Exclude<RecursiveConditional<U, TYPES>, TYPES>> | TYPES // Elements cannot be TYPES
		: T extends object
			? { [K in keyof T]: RecursiveConditional<T[K], TYPES> | TYPES }
			: T | TYPES;

//
export type RecursiveReplace<T, TYPES> = T extends object
	? {
			[K in keyof T]: T[K] extends (infer U)[]
				? RecursiveReplace<U, TYPES>[]
				: RecursiveReplace<T[K], TYPES>;
		}
	: TYPES;

//
export type RecursiveNullable<T> = RecursiveConditional<T, null>;
export type RecursiveNullUndefinedAble<T> = RecursiveConditional<T, null | undefined>;
export type RecursiveNullUndefinedPartialAble<T> = RecursiveConditional<
	RecursivePartial<T>,
	null | undefined
>;
export type RecursiveToNull<T> = RecursiveReplace<T, null>;
export type RecursiveNever<T> = RecursiveReplace<T, never>;

//
export type ObjectPick<T, K extends keyof T> = {
	[P in K]: T[P];
};
