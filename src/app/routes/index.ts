import { Router } from 'express';
import { studentRoutes } from '../modules/student/student.route';
import { userRoutes } from '../modules/user/user.route';
import { academicSemestreRoutes } from '../modules/academicSemestre/academicSemestre.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/students',
    route: studentRoutes,
  },
  {
    path: '/academic-semestres',
    route: academicSemestreRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
