import ky from 'ky';

import {
  AvailableScheduleParams,
  ReservableDate,
} from '../../types/detail/types';

export const getAvailableSchedule = async ({
  activityId,
  year,
  month,
}: AvailableScheduleParams): Promise<ReservableDate[]> => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}activities/${activityId}/available-schedule`;

  const res = await ky
    .get(url, {
      searchParams: { year, month },
    })
    .json<ReservableDate[]>();

  return res;
};
