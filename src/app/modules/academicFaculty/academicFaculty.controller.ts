// import { userService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { academicFacultyService } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacultyService.createAcademicFaculty(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Faculty Created Successfully',
    data: result,
  });
});

const getAllAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacultyService.getAllAcademicFaculty();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Faculty Retrieved Successfully',
    data: result,
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result =
    await academicFacultyService.getSingleAcademicFaculty(facultyId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Faculty Retrieved Successfully',
    data: result,
  });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await academicFacultyService.updateAcademicFaculty(
    facultyId,
    req.body,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Faculty Updated Successfully',
    data: result,
  });
});
export const academicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
