interface ReservableTimeSlot {
  id: number;
  startTime: string;
  endTime: string;
}

export interface ReservableDate {
  date: string;
  times: ReservableTimeSlot[];
}

export interface Review {
  id: number;
  user: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
  activityId: number;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}
