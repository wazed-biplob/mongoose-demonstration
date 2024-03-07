import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { appError } from '../errors/appError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { IUserRole } from '../modules/user/user.interface';

const auth = (...requiredRoles: IUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization;

    if (!token) {
      throw new appError(httpStatus.UNAUTHORIZED, 'You are not authorised.');
    }
    jwt.verify(
      token,
      config.jwt_access_token as string,
      function (err, decoded) {
        if (err) {
          throw new appError(httpStatus.UNAUTHORIZED, 'Something went wrong.');
        }
        const role = (decoded as JwtPayload)?.jwtPayload.role;
        if (requiredRoles && !requiredRoles.includes(role)) {
          throw new appError(
            httpStatus.UNAUTHORIZED,
            'You are not authorised.',
          );
        }
        req.user = decoded as JwtPayload;
      },
    );
    next();
  });
};
export default auth;
