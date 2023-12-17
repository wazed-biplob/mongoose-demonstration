import { ZodError, ZodIssue } from 'zod';
import { TErrorSource, TGenericError } from '../interface/error';

export const zodErrorHandler = (err: ZodError): TGenericError => {
  const errorSources: TErrorSource = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });
  const statusCode = 404;
  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};
