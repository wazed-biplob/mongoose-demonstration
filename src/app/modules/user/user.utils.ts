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
  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateStudentId = async (payload: TAcademicSemestre) => {
  let currentId = (0).toString();
  const lastStudentId = await findStudentId();

  const lastStudentSemestreCode = lastStudentId?.substring(4, 6);
  const lastStudentYearCode = lastStudentId?.substring(0, 4);
  const currentSemestreCode = payload.code;
  const currentYearCode = payload.year;
  if (
    lastStudentId &&
    lastStudentSemestreCode === currentSemestreCode &&
    lastStudentYearCode === currentYearCode
  ) {
    currentId = lastStudentId.substring(6);
  }

  let incrementedId = (Number(currentId) + 1).toString().padStart(4, '0');

  return (incrementedId = `${payload.year}${payload.code}${incrementedId}`);
};
