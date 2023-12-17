import { userService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
const createStudent = catchAsync(async (req, res) => {
  // try {
  const { password, student: studentData } = req.body;

  // validation using library
  // const { error, value } = studentJoiSchema.validate(studentData);

  // validation using zod

  // const parsedData = studentZodSchema.parse(studentData);

  const result = await userService.createStudent(password, studentData);

  // if (error) {
  //   res.status(400).json({
  //     success: false,
  //     message: 'Something went wrong!',
  //     error: error.details,
  //   });
  // }
  // res.status(201).json({
  //   success: true,
  //   message: 'Student has been created successfully.',
  //   data: result,
  // });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'New Student Created Successfully',
    data: result,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // } catch (err) {
  // res.status(500).json({
  //   success: false,
  //   message: err.message,
  //   error: `Error Message : ` + err,
  // });
  // next(err);
  // }
});

export const userController = {
  createStudent,
};
