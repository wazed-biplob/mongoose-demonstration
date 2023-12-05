import {
  TAcademicSemestreCode,
  TAcademicSemestreName,
  TMonths,
  TSemestreMapper,
} from './academicSemestre.interface';

export const Month: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemestreName: TAcademicSemestreName[] = [
  'Autumn',
  'Summar',
  'Fall',
];

export const academicSemestreCode: TAcademicSemestreCode[] = ['01', '02', '03'];

export const semestreMapper: TSemestreMapper = {
  Autumn: '01',
  Summar: '02',
  Fall: '03',
};
