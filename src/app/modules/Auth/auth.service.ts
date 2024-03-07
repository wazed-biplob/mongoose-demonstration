import httpStatus from 'http-status';
import { appError } from '../../errors/appError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import bcrypt from 'bcrypt';
const loginUser = async (payload: TLoginUser) => {
  const user = await User.userExistByCustomId(payload.id);

  const isDeleted = user?.isDeleted;
  if (!user || isDeleted || user?.status === 'blocked') {
    throw new appError(
      httpStatus.NOT_FOUND,
      'User Does not exist or has been deleted or is blocked',
    );
  }
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  const jsonAccessToken = jwt.sign(
    { jwtPayload },
    config.jwt_access_token as string,
    {
      expiresIn: '10d',
    },
  );

  const match = await User.passwordMatched(payload.password, user.password);

  if (!match) {
    throw new appError(httpStatus.FORBIDDEN, 'Password is incorrect.');
  }

  return {
    jsonAccessToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const user = await User.userExistByCustomId(userData?.jwtPayload.userId);

  const isDeleted = user?.isDeleted;
  if (!user || isDeleted || user?.status === 'blocked') {
    throw new appError(
      httpStatus.NOT_FOUND,
      'User Does not exist or has been deleted or is blocked',
    );
  }
  const match = await User.passwordMatched(payload.oldPassword, user?.password);

  if (!match) {
    throw new appError(httpStatus.FORBIDDEN, `Password don't match`);
  }

  const newHashedPassword = async () => {
    return await bcrypt.hash(
      payload.newPassword,
      Number(config.bcrypt_salt_round),
    );
  };

  newHashedPassword().then(async (hash) => {
    const result = await User.findOneAndUpdate(
      {
        id: userData.jwtPayload.userId,
        role: userData.jwtPayload.role,
      },
      {
        password: hash,
        needsPasswordChange: false,
      },
    );
    return result;
  });
};
export const authServices = {
  loginUser,
  changePassword,
};
