export interface Month {
  id: string;
  name: string;
  year: number;
}

export interface MonthReq {
  name: string;
  year: number;
}

export interface Habit {
  id: string;
  title: string;
  maxDays: number | null;
}

export interface ZiyadahMurajaahType {
  id: string;
  surah: string;
  date: Date;
  lembar: number;
}

export interface TilawahType {
  id: string;
  surah: string;
  lembar: number;
}

export interface UserType {
  id: string,
  name:string,
  email: string,
  password: string,
  fullname: string,
  joinDate: string,
  role: string,
  value:string
}

export interface EvaluationGeneralType{
  about: string,
  problem: string,
  userId?:string,
}

