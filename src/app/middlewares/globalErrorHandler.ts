/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodEffects, ZodError, ZodIssue } from 'zod';
import config from '../config';
import { zodErrorHandler } from '../errors/zodError';
import { validationErrorHandler } from '../errors/validationError';
import { castErrorHandler } from '../errors/castError';
import { duplicateErrorHandler } from '../errors/duplicateError';
import { appError } from '../errors/appError';
import { TErrorSource } from '../interface/error';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = err.message;
  let errorSources: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = zodErrorHandler(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = validationErrorHandler(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === 'CastError') {
    const simplifiedError = castErrorHandler(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedError = duplicateErrorHandler(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err instanceof appError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources = [{ path: '', message: err?.message }];
  } else if (err instanceof Error) {
    message = 'Something went wrong';
    errorSources = [{ path: '', message: err?.message }];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err,
    stack: config.node_env === 'development' ? err?.stack : null,
  });
};

export default errorHandler;
