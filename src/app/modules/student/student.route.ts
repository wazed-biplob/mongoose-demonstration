import express from 'express';
import { studentController } from './student.controller';

const router = express.Router();

// calls controller
router.post('/create-student', studentController.createStudent);
router.get('/', studentController.getStudents);
router.get('/:id', studentController.getStudentById);
router.delete('/:id', studentController.deleteStudentById);
export const studentRoutes = router;
