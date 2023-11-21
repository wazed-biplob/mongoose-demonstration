import { Request, Response } from 'express';
import { studentServices } from './student.service';
import { studentZodSchema } from './student.zod.validation';
import { ZodError } from 'zod';

// import { studentJoiSchema } from './studentschema';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    // validation using library
    // const { error, value } = studentJoiSchema.validate(studentData);

    // validation using zod

    const parsedData = studentZodSchema.parse(studentData);
    const result = await studentServices.createStudent(parsedData);

    // if (error) {
    //   res.status(400).json({
    //     success: false,
    //     message: 'Something went wrong!',
    //     error: error.details,
    //   });
    // }
    res.status(200).json({
      success: true,
      message: 'Student has been created successfully.',
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Something went wrong',
      error: `Error Message : ` + err,
    });
  }
};

const getStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getStudents;
    res.status(200).json({
      success: true,
      message: 'Students retrieved',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getStudentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await studentServices.getStudentById(id);
    res.status(200).json({
      success: true,
      message: 'Result Retrieved',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const studentController = {
  createStudent,
  getStudents,
  getStudentById,
};
