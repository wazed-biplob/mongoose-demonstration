import { z } from 'zod';
import validator from 'validator';

const usernameSchema = z.object({
  fName: z
    .string()
    .max(20)
    .refine(
      (value) => {
        const fName =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        return fName === value;
      },
      {
        message: 'First Name should be written correctly',
      },
    ),
  middleName: z.string().optional(),
  lname: z.string().refine((value) => validator.isAlpha(value), {
    message: 'No Number Allowed',
  }),
});

const guardianSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const localGuardianSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNumber: z.string().optional(),
  address: z.string().optional(),
});

export const createStudentZodValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: usernameSchema.required(),
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNumber: z.string(),
      emergencyContact: z.string(),
      // bloodgroup: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-']).optional(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: guardianSchema.required(),
      localGuardian: localGuardianSchema.required(),
      admissionSemestre: z.string(),
      profileImage: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentZodValidationSchema,
};
