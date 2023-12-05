import express from 'express';
import { userController } from './user.controller';

import { createStudentZodValidationSchema } from '../student/student.zod.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(createStudentZodValidationSchema),
  userController.createStudent,
);

export const userRoutes = router;
