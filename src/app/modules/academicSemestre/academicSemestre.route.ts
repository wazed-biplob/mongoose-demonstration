import express from 'express';
import { academicSemestreController } from './academicSemestre.controller';
import validateRequest from '../../middlewares/validateRequest';
import academicSemestreValidationSchema from './academicSemestre.validation';

const router = express.Router();

router.post(
  '/create-academic-semestre',
  validateRequest(academicSemestreValidationSchema),
  academicSemestreController.createAcademicSemestre,
);
// calls controller

// router.get('/', studentController.getStudents);
// router.get('/:id', studentController.getStudentById);
// router.delete('/:id', studentController.deleteStudentById);
export const academicSemestreRoutes = router;
