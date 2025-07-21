export interface Event {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD 형식
  color: 'red' | 'blue' | 'orange' | 'green' | 'purple';
  number: number;
}
