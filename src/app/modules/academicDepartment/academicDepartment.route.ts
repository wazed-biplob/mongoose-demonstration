import express from 'express';

import validateRequest from '../../middlewares/validateRequest';

import {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
} from './academicDepartment.validation';
import { academicDepartmentController } from './academicDepartment.controller';

const router = express.Router();

router.post(
  '/create-academic-department',
  // validateRequest(createAcademicDepartmentValidationSchema),
  academicDepartmentController.createAcademicDepartment,
);
router.get(
  '/:departmentId',
  academicDepartmentController.getSingleAcademicDepartment,
);

router.get('/', academicDepartmentController.getAllAcademicDepartment);

router.patch(
  '/:departmentId',
  validateRequest(updateAcademicDepartmentValidationSchema),
  academicDepartmentController.updateAcademicDepartment,
);

export const academicDepartmentRoutes = router;
