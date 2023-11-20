import { Request, Response } from 'express';
import { studentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    const result = await studentServices.createStudent(studentData);
    res.status(200).json({
      success: true,
      message: 'Student has been created successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
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
