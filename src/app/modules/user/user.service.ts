import config from '../../config';
import { TAcademicSemestre } from '../academicSemestre/academicSemestre.interface';
import { AcademicSemestreModel } from '../academicSemestre/academicSemestre.model';
import { Student } from '../student/student.model';
import { TStudent } from '../student/students.interface';
import { TUSER } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudent = async (password: string, payload: TStudent) => {
  // static
  //   if (await Student.userExists(studentData.id)) {
  //     throw new Error('User already registered');
  //   }
  // built-in static method which is 'create'
  // password validation
  // sets student role
  // create a user Model
  const userData: Partial<TUSER> = {};
  // use default pass if pass is not set
  userData.password = userData.password || (config.default_pass as string);
  // set role
  userData.role = 'student';
  // manually generated id
  // userData.id = '20301413';

  const admissionSemestre = await AcademicSemestreModel.findById(
    payload.admissionSemestre,
  );

  userData.id = await generateStudentId(admissionSemestre as TAcademicSemestre);

  const newUser = await User.create(userData);

  // create a student
  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id; // reference id

    const newStudent = await Student.create(payload);

    return newStudent;
  }

  // creates an instance
  // const student = new Student(studentData);
  // if (await student.userExists(studentData.id)) {
  //   throw new Error('User Already Exists');
  // }

  // built-in instance method provided by mongoose
  // const result = await student.save();
  //   return result;
};

export const userService = {
  createStudent,
};
