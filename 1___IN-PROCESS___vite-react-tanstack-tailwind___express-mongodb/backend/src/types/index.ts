import { Request } from "express";
import { TUser } from "../models/ModelUser";

export type TRequest = Request & { _user?: TUser };
