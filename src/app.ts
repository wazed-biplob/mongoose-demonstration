import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { studentRoutes } from './app/modules/student/student.route';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/students', studentRoutes);
const getController = (req: Request, res: Response) => {
  res.send('Hello World!');
};
app.get('/', getController);

export default app;
