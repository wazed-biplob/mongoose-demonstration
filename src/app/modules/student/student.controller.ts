import { NextFunction, Request, Response } from 'express';
import { studentServices } from './student.service';
// import { studentZodSchema } from './student.zod.validation';

// import { studentJoiSchema } from './studentschema';

const getStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await studentServices.getStudents();
    res.status(200).json({
      success: true,
      message: 'Students retrieved',
      result: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err) {
    // res.status(500).json({
    //   success: false,
    //   message: err.message,
    //   error: `Error Message : ` + err,
    // });
    next(err);
  }
};

const getStudentById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const result = await studentServices.getStudentById(Number(id));
    res.status(200).json({
      success: true,
      message: 'Result Retrieved',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err) {
    // res.status(500).json({
    //   success: false,
    //   message: err.message,
    //   error: `Error Message : ` + err,
    // });
    next(err);
  }
};

const deleteStudentById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await studentServices.deleteStudentById(id);
    if (result.modifiedCount) {
      res.status(200).json({
        success: true,
        message: 'Student Record Removed',
        data: null,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err) {
    // res.status(500).json({
    //   success: false,
    //   message: err.message,
    //   error: `Error Message : ` + err,
    // });
    next(err);
  }
};

export const studentController = {
  getStudents,
  getStudentById,
  deleteStudentById,
};
