import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { useCallback, useMemo, useState } from 'react';

import { Event } from '../types/event';

dayjs.extend(isSameOrBefore);

export function useCalendar(initialEvents: Event[]) {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [events] = useState<Event[]>(initialEvents);
  const today = useMemo(() => dayjs(), []);

  const eventsByDate = useMemo(() => {
    const eventMap: Record<string, Event[]> = {};
    events.forEach((event) => {
      if (!eventMap[event.date]) {
        eventMap[event.date] = [];
      }
      eventMap[event.date].push(event);
    });
    return eventMap;
  }, [events]);

  const days = useMemo(() => {
    const monthStart = currentDate.startOf('month');
    const monthEnd = currentDate.endOf('month');
    const calendarStart = monthStart.startOf('week');
    const calendarEnd = monthEnd.endOf('week');

    const daysArr: dayjs.Dayjs[] = [];
    let day = calendarStart;
    while (day.isSameOrBefore(calendarEnd)) {
      daysArr.push(day);
      day = day.add(1, 'day');
    }
    return daysArr;
  }, [currentDate]);

  const getEventsForDate = useCallback(
    (date: dayjs.Dayjs) => {
      const formattedDate = date.format('YYYY-MM-DD');
      return eventsByDate[formattedDate] || [];
    },
    [eventsByDate],
  );

  const prevMonth = useCallback(
    () => setCurrentDate((prev) => prev.subtract(1, 'month')),
    [],
  );
  const nextMonth = useCallback(
    () => setCurrentDate((prev) => prev.add(1, 'month')),
    [],
  );

  return {
    currentDate,
    today,
    days,
    getEventsForDate,
    prevMonth,
    nextMonth,
  };
}
