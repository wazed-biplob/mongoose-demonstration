import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './students.interface';

const usernameSchema = new Schema<UserName>({
  fName: { type: String, required: [true, 'First Name is required'] },
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
  id: { type: Number, required: true, unique: true },
  name: { type: usernameSchema, required: true },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: '{VALUE} is not valid',
    },
    required: true,
  },
  dataOfBirth: { type: String },
  email: { type: String, required: true, unique: true },
  contactNumber: { type: String, required: true },
  emergencyContact: { type: String, required: true },
  bloodgroup: {
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-'],
    },
  },
  presentAddress: { type: String },
  permanentAddress: { type: String },
  guardian: { type: guadianSchema, required: true },
  localGuardian: { type: localGuardianSchema, required: true },
  profileImage: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
});

export const StudentModel = model<Student>('student', studentSchema);
