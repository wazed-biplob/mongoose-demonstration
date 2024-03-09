import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import {
  createAcademicFacultyValidationSchema,
  updateAcademicFacultyValidationSchema,
} from './academicFaculty.validation';
import { academicFacultyController } from './academicFaculty.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(createAcademicFacultyValidationSchema),
  academicFacultyController.createAcademicFaculty,
);
router.get(
  '/:facultyId',

  academicFacultyController.getSingleAcademicFaculty,
);

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  academicFacultyController.getAllAcademicFaculty,
);

router.patch(
  '/:facultyId',
  validateRequest(updateAcademicFacultyValidationSchema),
  academicFacultyController.updateAcademicFaculty,
);
export const academicFacultyRoutes = router;
