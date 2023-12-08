import { semestreMapper } from './academicSemestre.constant';
import { TAcademicSemestre } from './academicSemestre.interface';
import { AdmissionSemestre } from './academicSemestre.model';

const createAcademicSemestre = async (payload: TAcademicSemestre) => {
  if (semestreMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Code');
  }
  const result = AdmissionSemestre.create(payload);
  return result;
};

const getAcademicSemestres = async () => {
  const result = await AdmissionSemestre.find();

  return result;
};

export const academicSemestreServices = {
  createAcademicSemestre,
  getAcademicSemestres,
};
