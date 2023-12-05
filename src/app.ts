import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import errorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express();

app.use(express.json());
app.use(cors());
// app routes
app.use('/api/v1', router);

const getController = (req: Request, res: Response) => {
  res.send('Hello World!');
};
app.get('/', getController);

app.use(errorHandler);
app.use(notFound);
export default app;
