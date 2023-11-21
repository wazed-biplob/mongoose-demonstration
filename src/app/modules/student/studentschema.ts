import Joi from 'joi';
// joy

const usernameJoiSchema = Joi.object({
  fName: Joi.string()
    .trim()
    .max(20)
    .required()
    .regex(/^[a-zA-Z]+$/, 'Only alphabetical characters allowed')
    .message('{VALUE} should be written correctly'),
  middleName: Joi.string(),
  lname: Joi.string()
    .required()
    .regex(/^[a-zA-Z]+$/, 'Only alphabetical characters allowed')
    .message('No Number Allowed'),
});

// Joi schema for the guardian
const guardianJoiSchema = Joi.object({
  fatherName: Joi.string(),
  fatherOccupation: Joi.string(),
  fatherContactNo: Joi.string(),
  motherName: Joi.string(),
  motherOccupation: Joi.string(),
  motherContactNo: Joi.string(),
});

// Joi schema for the local guardian
const localGuardianJoiSchema = Joi.object({
  name: Joi.string(),
  occupation: Joi.string(),
  contactNumber: Joi.string(),
  address: Joi.string(),
});

// Joi schema for the student
export const studentJoiSchema = Joi.object({
  id: Joi.number().required(),
  name: usernameJoiSchema.required(),
  gender: Joi.string().valid('male', 'female').required(),
  dateOfBirth: Joi.string(),
  email: Joi.string().email().required(),
  contactNumber: Joi.string().required(),
  emergencyContact: Joi.string().required(),
  bloodgroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'O+', 'O-'),
  presentAddress: Joi.string(),
  permanentAddress: Joi.string(),
  guardian: guardianJoiSchema.required(),
  localGuardian: localGuardianJoiSchema.required(),
  profileImage: Joi.string(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
});
