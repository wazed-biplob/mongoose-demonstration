import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';

const router = express.Router();

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  next();
};

router.post('/create-student', validateRequest, userController.createStudent);

export const userRoutes = router;
