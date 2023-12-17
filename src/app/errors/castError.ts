import mongoose from 'mongoose';
import { TErrorSource, TGenericError } from '../interface/error';

export const castErrorHandler = (
  err: mongoose.Error.CastError,
): TGenericError => {
  const errorSources: TErrorSource = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Invalid Id',
    errorSources,
  };
};
