/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSource, TGenericError } from '../interface/error';

export const duplicateErrorHandler = (err: any): TGenericError => {
  const regex = /"(.*?)"/;
  const match = err.message.match(regex);
  const extractedMessage = match && match[1];
  const errorSources: TErrorSource = [
    {
      path: '',
      message: `${extractedMessage} already exists`,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Invalid Id',
    errorSources,
  };
};
