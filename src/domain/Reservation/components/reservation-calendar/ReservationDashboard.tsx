'use client';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import ReservationCalendar from '@/domain/Reservation/components/reservation-calendar/ReservationCalendar';
import ReservationSelect from '@/domain/Reservation/components/reservation-calendar/ReservationSelect';
import {
  getReservationDashboard,
  type MonthlyReservation,
} from '@/domain/Reservation/services/reservation-calendar';

import type { Activity } from '../../types/reservation';

export default function ReservationDashboard({
  initialActivities,
}: {
  initialActivities: Activity[];
}) {
  const [selectedActivityId, setSelectedActivityId] = useState<number | null>(
    initialActivities[0]?.id ?? null,
  );
  const [currentDate, setCurrentDate] = useState(dayjs());

  // API 호출 결과 저장용 상태
  const [monthlyReservations, setMonthlyReservations] = useState<
    MonthlyReservation[]
  >([]);

  // 월별 예약 현황만 전역 상태로 관리리
  useEffect(() => {
    if (!selectedActivityId) return;

    const fetchMonthlyData = async () => {
      const year = currentDate.year();
      const month = currentDate.format('MM'); // 또는 padStart 방식

      // getReservationDashboard는 scheduleId, status가 아닌 year, month를 받습니다.
      const data = await getReservationDashboard(
        selectedActivityId.toString(),
        year.toString(),
        month,
      );
      setMonthlyReservations(data || []);
    };

    fetchMonthlyData();
  }, [selectedActivityId, currentDate]); // 체험 ID나 현재 날짜(월)가 바뀌면 재호출

  const handleSelectActivity = (id: number) => {
    setSelectedActivityId(id);
  };

  const handleMonthChange = (newDate: dayjs.Dayjs) => {
    setCurrentDate(newDate);
  };

  return (
    <>
      <div className='w-full'>
        <ReservationSelect
          activities={initialActivities}
          selectedId={selectedActivityId ?? 0}
          onSelect={handleSelectActivity}
        />
      </div>
      <div className='w-full'>
        <ReservationCalendar
          key={selectedActivityId}
          currentDate={currentDate}
          monthlyReservations={monthlyReservations}
          selectedActivityId={selectedActivityId ?? 0}
          onMonthChange={handleMonthChange}
        />
      </div>
    </>
  );
}
