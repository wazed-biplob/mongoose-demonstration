import { Schema, model } from 'mongoose';
import { TUSER } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';
const userSchema = new Schema<TUSER>(
  {
    id: { type: String, required: true },
    password: { type: String, required: true },
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

export const User = model<TUSER>('netizen', userSchema);
