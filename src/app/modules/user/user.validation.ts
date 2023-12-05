import { z } from 'zod';

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be String',
    })
    .max(20, { message: 'Password Maxium length is 20 Characters' })
    .optional(),
});

export default userValidationSchema;
