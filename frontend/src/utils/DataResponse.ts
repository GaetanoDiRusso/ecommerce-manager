import { CustomError } from "./CustomError"

export type DataResponse<T> = Promise<T | CustomError>