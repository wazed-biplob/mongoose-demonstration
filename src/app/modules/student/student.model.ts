import { Schema, model } from 'mongoose';
import validator from 'validator';

import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './students.interface';
import { optional } from 'joi';

// mongoose
const usernameSchema = new Schema<UserName>({
  fName: {
    type: String,
    trim: true,
    maxlength: [20, 'Maximum 20 Characters Allowed'],
    required: [true, 'First Name is required'],
    validate: {
      validator: function (value: string) {
        const fName =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        return fName === value;
      },
      message: '{VALUE} should be written correctly',
    },
  },
  middleName: { type: String },
  lname: {
    type: String,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: 'No Number Allowed',
    },
    required: true,
  },
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
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not valid',
    },
    required: true,
  },
  dateOfBirth: { type: String, required: true },
  email: {
    type: String,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: 'Provide Valid Email Address',
    },
    required: true,
    unique: true,
  },
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
