import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import {
  createAcademicFacultyValidationSchema,
  updateAcademicFacultyValidationSchema,
} from './academicFaculty.validation';
import { academicFacultyController } from './academicFaculty.controller';
import auth from '../../middlewares/auth';

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

router.get('/', auth(), academicFacultyController.getAllAcademicFaculty);

router.patch(
  '/:facultyId',
  validateRequest(updateAcademicFacultyValidationSchema),
  academicFacultyController.updateAcademicFaculty,
);
export const academicFacultyRoutes = router;
