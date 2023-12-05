import config from '../../config';
import { Student } from '../student/student.model';
import { TStudent } from '../student/students.interface';
import { TUSER } from './user.interface';
import { User } from './user.model';

const createStudent = async (password: string, studentData: TStudent) => {
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
  userData.id = '20301412';
  const newUser = await User.create(userData);
  // create a student
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id; // reference id

    const newStudent = await Student.create(studentData);

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
