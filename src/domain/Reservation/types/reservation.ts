export type ReservationStatus = 'completed' | 'confirmed' | 'pending';

export interface Reservation {
  date: string;
  reservations: Partial<Record<ReservationStatus, number>>;
}
