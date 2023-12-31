/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose';
import { Student } from './student.model';
import httpStatus from 'http-status';
import { appError } from '../../errors/appError';
import { User } from '../user/user.model';
import { TStudent } from './students.interface';
import { QueryBuilder } from '../../builder/queryBuilder';
import { studentSearchFields } from './student.constant';

// import { TStudent } from './students.interface';

const getStudents = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    Student.find().populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    }),
    query,
  )
    .search(studentSearchFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;

  // const queryObj = { ...query };
  // let searchTerm = '';
  // if (query?.searchTerm) {
  //   searchTerm = query.searchTerm as string;
  // };
  // const excludedFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  // excludedFields.forEach((el) => delete queryObj[el]);
  // const searchQuery = Student.find({
  //   $or: studentSearchFields.map((field) => ({
  //     [field]: new RegExp(searchTerm, 'i'),
  //   })),
  // });
  // const filterQuery = searchQuery
  //   .find(queryObj)
  //
  //   .populate('admissionSemestre');

  // if (query?.sort) {
  //   sort = query.sort as string;
  // }
  // const sortQuery = filterQuery.sort(sort);

  // if (query?.limit) {
  //   limit = Number(query.limit);
  // }

  // if (query?.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }
  // const paginateQuery = sortQuery.skip(skip);
  // if (query?.limit) {
  //   limit = query.limit as number;
  // }
  // const limitQuery = paginateQuery.limit(limit);

  // let fields = '-__V';
  // if (query?.fields) {
  //   fields = (query.fields as string).split(',').join(' ');
  // }

  //   const fieldQuery = await limitQuery.select(fields);
  //   return fieldQuery;
};

const getStudentById = async (id: string) => {
  // const result = await Student.aggregate([{ $match: { id: id } }]);
  const result = await Student.findById(id)
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
    .populate('admissionSemestre');
  return result;
};

const updateStudentById = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }
  const result = await Student.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteStudentById = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const deletedStudent = await Student.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new appError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }
    const userId = deletedStudent.user;
    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new appError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession;
  }
};
export const studentServices = {
  getStudents,
  getStudentById,
  deleteStudentById,
  updateStudentById,
};
