import { useQuery } from '@tanstack/react-query';

import { getAvailableSchedule } from '../../services/detail/getAvailableSchedule';
import {
  AvailableScheduleParams,
  ReservableDate,
} from '../../types/detail/types';

export const useAvailableSchedule = ({
  activityId,
  year,
  month,
}: AvailableScheduleParams) => {
  return useQuery<ReservableDate[]>({
    queryKey: ['availableSchedule', activityId, year, month],
    queryFn: () => getAvailableSchedule({ activityId, year, month }),
    staleTime: 1000 * 60 * 30, // 30분 캐싱
    enabled: !!activityId && !!year && !!month, // 안전하게 조건부 실행
  });
};
