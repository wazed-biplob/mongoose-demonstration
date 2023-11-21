import { Schema, model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentMethods,
  StudentModel,
  TUserName,
} from './students.interface';
import config from '../../config';
// import { optional } from 'joi';

// mongoose
const usernameSchema = new Schema<TUserName>({
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

const guadianSchema = new Schema<TGuardian>({
  fatherName: { type: String },
  fatherOccupation: { type: String },
  fatherContactNo: { type: String },
  motherName: { type: String },
  motherOccupation: { type: String },
  motherContactNo: { type: String },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String },
  occupation: { type: String },
  contactNumber: { type: String },
  address: { type: String },
});
// static
const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: Number, required: [true, 'Id is required'], unique: true },
  password: {
    type: String,
    required: [true, 'password is required'],
    unique: true,
    maxlength: [20, 'Max length 20 Characters'],
  },
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

// moongoose middleware

studentSchema.pre('save', async function (next) {
  // password hashing
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );

  next();
});

studentSchema.post('save', function () {
  console.log(this, 'Data has been stored');
});

// static method

studentSchema.statics.userExists = async function (id: number) {
  const existingUser = await Student.findOne({ id: id });
  return existingUser;
};

// instance method
// const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>({
//   id: { type: Number, required: true, unique: true },
//   name: { type: usernameSchema, required: true },
//   gender: {
//     type: String,
//     enum: {
//       values: ['male', 'female', 'other'],
//       message: '{VALUE} is not valid',
//     },
//     required: true,
//   },
//   dateOfBirth: { type: String, required: true },
//   email: {
//     type: String,
//     validate: {
//       validator: (value: string) => validator.isEmail(value),
//       message: 'Provide Valid Email Address',
//     },
//     required: true,
//     unique: true,
//   },
//   contactNumber: { type: String, required: true },
//   emergencyContact: { type: String, required: true },
//   bloodgroup: {
//     enum: {
//       values: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-'],
//     },
//   },
//   presentAddress: { type: String },
//   permanentAddress: { type: String },
//   guardian: { type: guadianSchema, required: true },
//   localGuardian: { type: localGuardianSchema, required: true },
//   profileImage: { type: String },
//   isActive: {
//     type: String,
//     enum: ['active', 'blocked'],
//     default: 'active',
//   },
// });
// instance methods of mongoose
// studentSchema.methods.userExists = async function (id: number) {
//   const existingUser = await Student.findOne({ id: id });
//   return existingUser;
// };
export const Student = model<TStudent, StudentModel>('student', studentSchema);
