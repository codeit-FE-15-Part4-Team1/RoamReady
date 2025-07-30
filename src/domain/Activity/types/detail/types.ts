export interface ReservableTimeSlot {
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

export interface ReviewList {
  reviews: Review[];
  totalCount: number;
  averageRating: number;
}

export interface Activity {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  subImages: {
    id: number;
    imageUrl: string;
  }[];
  schedules: {
    id: number;
    date: string;
    startTime: string;
    endTime: string;
  }[];
}

export interface AvailableScheduleParams {
  activityId: number;
  year: string; // YYYY 형식 (예: '2025')
  month: string; // MM 형식 (예: '08')
}
