export interface Month {
  id: string;
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
}
export interface TilawahType {
  id: string;
  surah: string;
  lembar: number;
}


