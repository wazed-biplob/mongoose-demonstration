import { z } from 'zod';
import {
  Month,
  academicSemestreCode,
  academicSemestreName,
} from './academicSemestre.constant';

const academicSemestreValidationSchema = z.object({
  body: z.object({
    name: z.enum([...academicSemestreName] as [string, ...string[]]),
    year: z.string(),
    code: z.enum([...academicSemestreCode] as [string, ...string[]]),
    startMonth: z.enum([...Month] as [string, ...string[]]),
    endMonth: z.enum([...Month] as [string, ...string[]]),
  }),
});

export default academicSemestreValidationSchema;
