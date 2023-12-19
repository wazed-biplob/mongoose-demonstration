import { QueryBuilder } from '../../builder/queryBuilder';
import { courseSearchFields } from './course.constant';
import { TCourse } from './course.interface';
import { Course } from './course.model';

const createCourse = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCourses = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
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

  const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
    id,
    courseRemainingData,
    {
      new: true,
      runValidators: true,
    },
  );
  if (preRequisiteCourses && preRequisiteCourses.length > 0) {
    const deletedPreRequisiteCourse = preRequisiteCourses
      .filter((el) => el.course && el.isDeleted)
      .map((el) => el.course);
    const deletedCourses = await Course.findByIdAndUpdate(id, {
      $pull: {
        preRequisiteCourses: { course: { $in: deletedPreRequisiteCourse } },
      },
    });
    const newPreRequisites = preRequisiteCourses?.filter(
      (el) => el.course && !el.isDeleted,
    );
    const newPreRequisitesCourses = await Course.findByIdAndUpdate(id, {
      $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
    });
  }
  const result = Course.findById(id).populate('preRequisiteCourses.course');
  return result;
};
export const courseServices = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  deleteSingleCourse,
  updateCourse,
};
