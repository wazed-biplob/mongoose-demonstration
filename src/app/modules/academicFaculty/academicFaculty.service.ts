import { TAcademicFaculty } from './academiFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFaculty = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};
const getAllAcademicFaculty = async () => {
  const result = await AcademicFaculty.find();
  return result;
};
const getSingleAcademicFaculty = async (id: string) => {
  return await AcademicFaculty.findById(id);
};

const updateAcademicFaculty = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  return await AcademicFaculty.findOneAndUpdate(
    {
      _id: id,
    },
    payload,
    { new: true },
  );
};
export const academicFacultyService = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
