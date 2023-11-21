import { Model } from 'mongoose';

export interface TGuardian {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
}

export interface TUserName {
  fName: string;
  middleName?: string;
  lname: string;
}

export interface TLocalGuardian {
  name: string;
  occupation: string;
  contactNumber: string;
  address: string;
}
export interface TStudent {
  id: number;
  name: TUserName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  email: string;
  avatar?: string;
  contactNumber: string;
  emergencyContact: string;
  bloodgroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImage?: string;
  isActive: 'active' | 'blocked';
}

export type StudentMethods = {
  userExists(id: number): Promise<TStudent | null>;
};

export type StudentModel = Model<
  TStudent,
  Record<string, never>,
  StudentMethods
>;
