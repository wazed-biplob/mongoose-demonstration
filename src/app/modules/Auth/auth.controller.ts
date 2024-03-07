import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { authServices } from './auth.service';
import sendResponse from '../../utils/sendResponse';

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User is logegd in Successfully',
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;

  const result = await authServices.changePassword(req.user, passwordData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Password Has been changed Successfully',
    data: result,
  });
});

export const authController = {
  loginUser,
  changePassword,
};
