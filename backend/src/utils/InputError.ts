import { errorMessageEnum } from "./CustomError";

export type FieldError = {
    readonly input_error: string;
    readonly expected: string;
    readonly received: string;
    readonly path: (string | number)[];
    readonly message: string;
}

export class InputError extends Error {
    readonly message: string = errorMessageEnum.INVALID_INPUT;
    readonly code: number = 400;
    readonly fields: FieldError[];

    constructor(fields: FieldError[]) {
        super();
        this.fields = fields;
    }
}