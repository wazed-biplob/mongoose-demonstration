import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartment = async (payload: TAcademicDepartment) => {
  //   const academiDepartmentExist = await AcademicDepartment.findOne({
  //     name: payload.name,
  //   });
  //   if (academiDepartmentExist) {
  //     throw new Error('Academic Department Already Exists');
  //   }
  const result = await AcademicDepartment.create(payload);
  return result;
};
const getAllAcademicDepartment = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty');
  return result;
};
const getSingleAcademicDepartment = async (id: string) => {
  return await AcademicDepartment.findById(id).populate('academicFaculty');
};

const updateAcademicDepartment = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  return await AcademicDepartment.findOneAndUpdate(
    {
      _id: id,
    },
    payload,
    { new: true },
  );
};
export const academicDepartmentService = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
