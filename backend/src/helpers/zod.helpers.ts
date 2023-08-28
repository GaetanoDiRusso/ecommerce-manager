import {InputError, FieldError} from 'src/utils';
import {ZodIssue, ZodError, ZodObject} from 'zod';

export const zodToInputError = (zodErrors: ZodIssue[]) => {
  let inputFieldsError: FieldError[] = [];

  zodErrors.map((e: any) => {
    inputFieldsError.push({
      input_error: e.code,
      received: e.received,
      expected: e.expected,
      path: e.path,
      message: e.message,
    });
  });

  return new InputError(inputFieldsError);
};

export const parseZodSchema = <T>(schema: ZodObject<any>, data: any) => {
  try {
    return schema.parse(data) as T;
  } catch (error: any) {
    const inputZodErrors = (error as ZodError).issues;
    const inputError = zodToInputError(inputZodErrors);
    throw inputError;
  }
};