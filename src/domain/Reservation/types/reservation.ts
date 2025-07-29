import dayjs from 'dayjs';

export type ReservationStatus = 'completed' | 'confirmed' | 'pending';

export interface Reservation {
  date: string;
  reservations: Partial<Record<ReservationStatus, number>>;
}

export interface ReservationItem {
  id: number;
  nickname: string;
  userId: number;
  teamId: string;
  activityId: number;
  scheduleId: number;
  status: string;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface DayCellProps {
  day: dayjs.Dayjs;
  isCurrentMonth: boolean;
  isToday: boolean;
  isLastRow: boolean;
  reservation: Reservation | null;
}
