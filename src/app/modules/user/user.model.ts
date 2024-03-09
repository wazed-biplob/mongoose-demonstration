import { Schema, model } from 'mongoose';
import { TUSER, UserModel } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUSER, UserModel>(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    passwordChangedAt: {
      type: Date,
    },
    needsPasswordChange: { type: Boolean, default: true },
    role: { type: String, enum: ['admin', 'student', 'faculty'] },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

// moongoose middleware

userSchema.pre('save', async function (next) {
  // password hashing
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );

  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.userExistByCustomId = async function (id: string) {
  return await User.findOne({ id }).select('+password');
};

userSchema.statics.passwordMatched = async function (
  plainPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

userSchema.statics.isIATBeforePasswordChange = function (
  passwordChangedAt: Date,
  iatTimeStamp: number,
) {
  const passwordChangedAtTimestamp =
    new Date(passwordChangedAt).getTime() / 1000;
  return passwordChangedAtTimestamp > iatTimeStamp;
};

export const User = model<TUSER, UserModel>('User', userSchema);
