import { Router } from 'express';
import { studentRoutes } from '../modules/student/student.route';
import { userRoutes } from '../modules/user/user.route';
import { academicSemestreRoutes } from '../modules/academicSemestre/academicSemestre.route';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { academicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { courseRoutes } from '../modules/course/course.route';

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
  {
    path: '/academic-faculties',
    route: academicFacultyRoutes,
  },
  { path: '/academic-departments', route: academicDepartmentRoutes },
  { path: '/courses', route: courseRoutes },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
