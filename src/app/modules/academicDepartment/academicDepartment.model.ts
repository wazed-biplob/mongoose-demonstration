import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import { appError } from '../../errors/appError';

const academiDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: { type: String, unique: true },
    academicFaculty: { type: Schema.Types.ObjectId, ref: 'AcademicFaculty' },
  },
  { timestamps: true },
);

academiDepartmentSchema.pre('save', async function (next) {
  const academiDepartmentExist = await AcademicDepartment.findOne({
    name: this.name,
  });
  if (academiDepartmentExist) {
    throw new Error('Academic Department Already Exists');
  }
  next();
});

academiDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const academiDepartmentExist = await AcademicDepartment.findOne(query);
  if (!academiDepartmentExist) {
    throw new appError(404, `Academic Department doesn't exist`);
  }
  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academiDepartmentSchema,
);
