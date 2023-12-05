export type TMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type TAcademicSemestreName = 'Autumn' | 'Summar' | 'Fall';
export type TAcademicSemestreCode = '01' | '02' | '03';

export interface TAcademicSemestre {
  name: TAcademicSemestreName;
  code: TAcademicSemestreCode;
  year: string;
  startMonth: TMonths;
  endMonth: TMonths;
}

export interface TSemestreMapper {
  [key: string]: string;
}
