import { Student } from './student.model';
// import { TStudent } from './students.interface';

const getStudents = async () => {
  const result = await Student.find();
  return result;
};

const getStudentById = async (id: number) => {
  const result = await Student.aggregate([{ $match: { id: id } }]);
  // const result = await Student.findOne({ id: id });

  return result;
};

const deleteStudentById = async (id: string) => {
  const result = await Student.updateOne({ id: id }, { isDeleted: true });
  return result;
};
export const studentServices = {
  getStudents,
  getStudentById,
  deleteStudentById,
};
