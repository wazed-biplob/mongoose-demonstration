export type TErrorSource = {
  path: string | number;
  message: string;
}[];

export interface TGenericError {
  statusCode: number;
  message: string;
  errorSources: TErrorSource;
}
