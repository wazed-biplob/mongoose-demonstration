import mongoose from 'mongoose';
import { TSemestreRegistration } from './semestreRegistration.interface';

const semestreRegistrationSchema = new mongoose.Schema<TSemestreRegistration>(
  {},
);

export const semestreRegistration = mongoose.model<TSemestreRegistration>(
  'SemestreRegistration',
  semestreRegistrationSchema,
);
