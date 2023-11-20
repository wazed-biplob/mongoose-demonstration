import { StudentModel } from './student.model';
import { Student } from './students.interface';

const createStudent = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

const getStudents = async () => {
  const result = await StudentModel.find();
  return result;
};

const getStudentById = async (id: string) => {
  const result = await StudentModel.findOne({ id: id });
  return result;
};
export const studentServices = {
  createStudent,
  getStudents,
  getStudentById,
};
