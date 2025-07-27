import { API_ENDPOINTS } from '@/shared/constants/endpoints';
import { apiClient } from '@/shared/libs/apiClient';

import { ReservationItem } from '../../types/reservation';

export const getMyReservation = async (): Promise<ReservationItem[]> => {
  return await apiClient
    .get(API_ENDPOINTS.MY_RESERVATIONS.BASE)
    .json<ReservationItem[]>();
};
