import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    id: z.string(),
    password: z.string(),
  }),
});

const changePassowrdValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old Password Required',
    }),
    newPassword: z.string(),
  }),
});

export const authValidation = {
  loginValidationSchema,
  changePassowrdValidationSchema,
};
