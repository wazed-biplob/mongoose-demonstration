import express from 'express';
import { userController } from './user.controller';

import { createStudentZodValidationSchema } from '../student/student.zod.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.student),
  validateRequest(createStudentZodValidationSchema),
  userController.createStudent,
);

export const userRoutes = router;
