import { TAcademicSemestre } from '../academicSemestre/academicSemestre.interface';
import { User } from './user.model';

const findStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean();
  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};

export const generateStudentId = async (payload: TAcademicSemestre) => {
  const currentId = (await findStudentId()) || (0).toString();
  let incrementedId = (Number(currentId) + 1).toString().padStart(4, '0');
  return (incrementedId = `${payload.year}${payload.code}${incrementedId}`);
};
