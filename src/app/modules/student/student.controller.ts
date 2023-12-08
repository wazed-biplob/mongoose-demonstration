import { studentServices } from './student.service';
import catchAsync from '../../utils/catchAsync';
// import { studentZodSchema } from './student.zod.validation';

// import { studentJoiSchema } from './studentschema';

const getStudents = catchAsync(async (req, res) => {
  // try {
  const result = await studentServices.getStudents();
  res.status(200).json({
    success: true,
    message: 'Students retrieved',
    result: result,
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

const getStudentById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await studentServices.getStudentById(Number(id));
  res.status(200).json({
    success: true,
    message: 'Result Retrieved',
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

const deleteStudentById = catchAsync(async (req, res) => {
  // try {
  const { id } = req.params;
  const result = await studentServices.deleteStudentById(id);
  if (result) {
    res.status(200).json({
      success: true,
      message: 'Student Record Removed',
      data: result,
    });
  }
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

const updateStudentById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { student } = req.body;
  const result = await studentServices.updateStudentById(Number(id), student);
  if (result) {
    res.status(200).json({
      success: true,
      message: 'Student Record Updated',
      data: result,
    });
  }
});

export const studentController = {
  getStudents,
  getStudentById,
  deleteStudentById,
  updateStudentById,
};
