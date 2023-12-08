import { Schema, model } from 'mongoose';
import { TAcademicFaculty } from './academiFaculty.interface';

const academiFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: { type: String, unique: true },
  },
  { timestamps: true },
);

export const AcademicFaculty = model<TAcademicFaculty>(
  'AcademicFaculty',
  academiFacultySchema,
);
