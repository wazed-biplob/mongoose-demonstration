import express from 'express';
import { studentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { updateStudentZodValidationSchema } from './student.zod.validation';

const router = express.Router();

// calls controller

router.get('/', studentController.getStudents);
router.get('/:id', studentController.getStudentById);
router.delete('/:id', studentController.deleteStudentById);
router.patch(
  '/:id',
  validateRequest(updateStudentZodValidationSchema),
  studentController.updateStudentById,
);
export const studentRoutes = router;
