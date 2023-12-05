import { Schema, model } from 'mongoose';

import { TAcademicSemestre } from './academicSemestre.interface';
import {
  Month,
  academicSemestreCode,
  academicSemestreName,
} from './academicSemestre.constant';

const academicSemestreSchema = new Schema<TAcademicSemestre>(
  {
    name: { type: String, enum: academicSemestreName, required: true },
    year: { type: String, required: true },
    code: { type: String, enum: academicSemestreCode, required: true },
    startMonth: { type: String, enum: Month, required: true },
    endMonth: { type: String, enum: Month, required: true },
  },
  { timestamps: true },
);

academicSemestreSchema.pre('save', async function (next) {
  const semestreExist = await AcademicSemestreModel.findOne({
    year: this.year,
    name: this.name,
  });

  if (semestreExist) {
    throw new Error('Semestre Already Exists');
  }
  next();
});

export const AcademicSemestreModel = model<TAcademicSemestre>(
  'AcademicSemestre',
  academicSemestreSchema,
);
