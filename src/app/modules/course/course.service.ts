/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { QueryBuilder } from '../../builder/queryBuilder';
import { courseSearchFields } from './course.constant';
import { TCourse, TCourseFaculties } from './course.interface';
import { Course, CourseFaculty } from './course.model';
import { appError } from '../../errors/appError';
import httpStatus from 'http-status';

const createCourse = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCourses = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(Course.find(), query)
    .search(courseSearchFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourse = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

const deleteSingleCourse = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    { new: true },
  );
  return result;
};

const updateCourse = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );
    if (!updatedBasicCourseInfo) {
      throw new appError(httpStatus.BAD_REQUEST, 'Failed to update basic info');
    }
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletedPreRequisiteCourse = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);
      const deletedCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequisiteCourse } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      if (!deletedCourses) {
        throw new appError(
          httpStatus.BAD_REQUEST,
          'Failed to update deleted course',
        );
      }
      const newPreRequisites = preRequisiteCourses?.filter(
        (el) => el.course && !el.isDeleted,
      );
      const newPreRequisitesCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      if (!newPreRequisitesCourses) {
        throw new appError(
          httpStatus.BAD_REQUEST,
          'Failed to update new pre. courses',
        );
      }
    }
    await session.commitTransaction();
    await session.endSession();
    const result = await Course.findById(id).populate(
      'preRequisiteCourses.course',
    );
    return result;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new appError(httpStatus.BAD_REQUEST, 'Failed to update');
  }
};

const assignFacultieswithCourse = async (
  id: string,
  payload: Partial<TCourseFaculties>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    { upsert: true, new: true },
  );
  return result;
};

const removeFacultiesFromCourse = async (
  id: string,
  payload: Partial<TCourseFaculties>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    { new: true },
  );
  return result;
};
export const courseServices = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  deleteSingleCourse,
  updateCourse,
  assignFacultieswithCourse,
  removeFacultiesFromCourse,
};
