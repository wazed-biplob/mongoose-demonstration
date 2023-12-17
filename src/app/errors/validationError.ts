import mongoose from 'mongoose';
import { TErrorSource, TGenericError } from '../interface/error';

export const validationErrorHandler = (
  err: mongoose.Error.ValidationError,
): TGenericError => {
  const statusCode = 404;
  const errorSources: TErrorSource = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );
  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};
