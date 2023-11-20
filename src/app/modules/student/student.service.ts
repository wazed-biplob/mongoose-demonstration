import { StudentModel } from './student.model';
import { Student } from './students.interface';

const createStudent = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

export const studentServices = {
  createStudent,
};
