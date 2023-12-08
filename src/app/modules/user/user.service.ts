import mongoose from 'mongoose';
import config from '../../config';
import { TAcademicSemestre } from '../academicSemestre/academicSemestre.interface';
import { AdmissionSemestre } from '../academicSemestre/academicSemestre.model';
import { Student } from '../student/student.model';
import { TStudent } from '../student/students.interface';
import { TUSER } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import { appError } from '../../errors/appError';
import httpStatus from 'http-status';

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

  const admissionSemestre = await AdmissionSemestre.findById(
    payload.admissionSemestre,
  );

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateStudentId(
      admissionSemestre as TAcademicSemestre,
    );
    // T-1
    const newUser = await User.create([userData], { session });

    // create a student
    if (!newUser.length) {
      throw new appError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // reference id
    // T-2
    const newStudent = await Student.create([payload], { session });
    if (!newStudent) {
      throw new appError(httpStatus.BAD_REQUEST, 'Failed to create Student');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
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
