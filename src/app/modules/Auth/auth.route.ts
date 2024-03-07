import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { authValidation } from './auth.validation';
import { authController } from './auth.controller';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/login',
  validateRequest(authValidation.loginValidationSchema),
  authController.loginUser,
);

router.post(
  '/change-password',
  auth(USER_ROLE.student, USER_ROLE.faculty, USER_ROLE.student),
  validateRequest(authValidation.changePassowrdValidationSchema),
  authController.changePassword,
);

export const authRoutes = router;
