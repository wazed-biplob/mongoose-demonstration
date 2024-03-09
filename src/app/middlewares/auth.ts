import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { appError } from '../errors/appError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { IUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: IUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // gets token from request header
    const token = req?.headers?.authorization;
    // checks if token exists
    if (!token) {
      throw new appError(httpStatus.UNAUTHORIZED, 'You are not authorised.');
    }
    // decodes token
    const decoded = jwt.verify(
      token,
      config.jwt_access_token as string,
    ) as JwtPayload;
    // gets role, id from decoded token
    const { role, userId } = decoded.jwtPayload;
    const { iat } = decoded;

    // gets user with userId
    const user = await User.userExistByCustomId(userId);
    // checks necessary conditions to valdate user
    if (!user || user?.isDeleted || user?.status === 'blocked') {
      throw new appError(
        httpStatus.NOT_FOUND,
        'User Does not exist or has been deleted or is blocked',
      );
    }
    // checks iat and passwordChangeTimestamps
    if (
      user.passwordChangedAt &&
      User.isIATBeforePasswordChange(user.passwordChangedAt, iat as number)
    ) {
      throw new appError(httpStatus.FORBIDDEN, 'You are not authorised');
    }
    // checks whether user has permitted role
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new appError(httpStatus.UNAUTHORIZED, 'You are not authorised.');
    }
    // saves user info into decoded
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
