import { Request as Req, Response as Res, NextFunction as Next } from 'express'

export type Request = Req & {userId?: string};
export type Response = Res;
export type NextFunction = Next