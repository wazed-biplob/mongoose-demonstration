import express from 'express';
import { courseValidation } from './course.validation';
import { courseController } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(courseValidation.createCourseValidationSchema),
  courseController.createCourse,
);
router.patch(
  '/:id',
  validateRequest(courseValidation.updateCourseValidationSchema),
  courseController.updateCourse,
);
router.get('/:id', courseController.getSingleCourse);
router.delete('/:id', courseController.deleteSingleCourse);
router.get('/', courseController.getAllCourses);

// router.patch(
//   '/:facultyId',
//   validateRequest(updateAcademicFacultyValidationSchema),
//   academicFacultyController.updateAcademicFaculty,
// );
export const courseRoutes = router;
