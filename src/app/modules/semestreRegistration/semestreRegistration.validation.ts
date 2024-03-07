import { z } from 'zod';

const createSemestreRegistrationZodValidationSchema = z.object({
  body: z.object({}),
});

export const SemestreRegistrationValidations = {
  createSemestreRegistrationZodValidationSchema,
};
