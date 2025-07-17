interface ReservableTimeSlot {
  id: number;
  startTime: string;
  endTime: string;
}

export interface ReservableDate {
  date: string;
  times: ReservableTimeSlot[];
}
