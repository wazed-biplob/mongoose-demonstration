/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUSER {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface NewUser {
  password: string;
  role: string;
  id: string;
}

export interface UserModel extends Model<TUSER> {
  userExistByCustomId(id: string): Promise<TUSER>;

  passwordMatched(
    plainPassword: string,
    encryptedPassword: string,
  ): Promise<boolean>;
  isIATBeforePasswordChange(
    passwordChangeTimestamp: Date,
    iatTimeStamp: number,
  ): boolean;
}

export type IUserRole = keyof typeof USER_ROLE;
