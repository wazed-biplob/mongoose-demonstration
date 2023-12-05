import { semestreMapper } from './academicSemestre.constant';
import { TAcademicSemestre } from './academicSemestre.interface';
import { AcademicSemestreModel } from './academicSemestre.model';

const createAcademicSemestre = async (payload: TAcademicSemestre) => {
  if (semestreMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Code');
  }
  const result = AcademicSemestreModel.create(payload);
  return result;
};

export const academicSemestreServices = {
  createAcademicSemestre,
};
