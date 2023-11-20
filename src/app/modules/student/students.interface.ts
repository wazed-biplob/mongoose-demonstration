export interface Guardian {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
}

export interface UserName {
  fName: string;
  middleName: string;
  lname: string;
}

export interface LocalGuardian {
  name: string;
  occupation: string;
  contactNumber: string;
  address: string;
}
export interface Student {
  id: number;
  name: UserName;
  gender: 'male' | 'female';
  dataOfBirth: string;
  email: string;
  avatar?: string;
  contactNumber: string;
  emergencyContact: string;
  bloodgroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  profileImage?: string;
  isActive: 'active' | 'blocked';
}
