import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './students.interface';

const usernameSchema = new Schema<UserName>({
  fName: { type: String, required: true },
  middleName: { type: String },
  lname: { type: String, required: true },
});

const guadianSchema = new Schema<Guardian>({
  fatherName: { type: String },
  fatherOccupation: { type: String },
  fatherContactNo: { type: String },
  motherName: { type: String },
  motherOccupation: { type: String },
  motherContactNo: { type: String },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String },
  occupation: { type: String },
  contactNumber: { type: String },
  address: { type: String },
});
const studentSchema = new Schema<Student>({
  id: { type: Number, required: true },
  name: usernameSchema,
  gender: ['male', 'female'],
  dataOfBirth: { type: String },
  email: { type: String, required: true },
  contactNumber: { type: String, required: true },
  emergencyContact: { type: String, required: true },
  bloodgroup: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-'],
  presentAddress: { type: String },
  permanentAddress: { type: String },
  guardian: guadianSchema,
  localGuardian: localGuardianSchema,
  profileImage: { type: String },
  isActive: ['active', 'blocked'],
});

export const StudentModel = model<Student>('student', studentSchema);
