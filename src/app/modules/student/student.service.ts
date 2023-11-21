import { Student } from './student.model';
import { TStudent } from './students.interface';

const createStudent = async (studentData: TStudent) => {
  // built-in static method which is 'create'
  // const result = await StudentModel.create(studentData);

  // creates an instance
  const student = new Student(studentData);
  if (await student.userExists(studentData.id)) {
    throw new Error('User Already Exists');
  }

  // built-in instance method provided by mongoose
  const result = await student.save();
  return result;
};

const getStudents = async () => {
  const result = await Student.find();
  return result;
};

const getStudentById = async (id: string) => {
  const result = await Student.findOne({ id: id });
  return result;
};
export const studentServices = {
  createStudent,
  getStudents,
  getStudentById,
};
