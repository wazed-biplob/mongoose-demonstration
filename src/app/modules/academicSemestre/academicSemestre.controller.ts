// import { userService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { academicSemestreServices } from './academicSemestre.service';
const createAcademicSemestre = catchAsync(async (req, res) => {
  const result = await academicSemestreServices.createAcademicSemestre(
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Semestre Created Successfully',
    data: result,
  });
});

const getAcademicSemestres = catchAsync(async (req, res) => {
  const result = await academicSemestreServices.getAcademicSemestres();
  res.status(200).json({
    success: true,
    message: 'Semestres retrieved',
    result: result,
  });
});

export const academicSemestreController = {
  createAcademicSemestre,
  getAcademicSemestres,
};
