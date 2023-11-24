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
  password: string;
  name: TUserName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  email: string;
  avatar?: string;
  contactNumber: string;
  emergencyContact: string;
  // bloodgroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImage?: string;
  isActive: 'active' | 'blocked';
  isDeleted: boolean;
}
// creates a static

export interface StudentModel extends Model<TStudent> {
  // eslint-disable-next-line no-unused-vars
  userExists(id: number): Promise<TStudent | null>;
}

// creates an instance
// export type StudentMethods = {
//   userExists(id: number): Promise<TStudent | null>;
// };

// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >;
