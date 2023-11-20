import express from 'express';
import { studentController } from './student.controller';

const router = express.Router();

// calls controller
router.post('/create-student', studentController.createStudent);

export const studentRoutes = router;
