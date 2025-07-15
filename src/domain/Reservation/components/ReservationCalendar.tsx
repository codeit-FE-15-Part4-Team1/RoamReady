// dayjs-calendar/Calendar.jsx
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'; // 반복문을 위한 플러그인
import React, { useMemo, useState } from 'react';

dayjs.extend(isSameOrBefore); // 플러그인 활성화

// 이벤트 타입 정의
interface Event {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD 형식
  color: 'red' | 'blue' | 'orange' | 'green' | 'purple';
  number: number;
}

export const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

// 이벤트 우선순위 (중요도 순)
const PRIORITY_MAP = {
  완료: 0,
  승인: 1,
  예약: 2,
  거절: 3,
  취소: 4,
};

// 샘플 이벤트 데이터
const sampleEvents: Event[] = [
  { id: '1', title: '완료', date: '2025-07-14', color: 'green', number: 1 },
  { id: '2', title: '예약', date: '2025-07-15', color: 'purple', number: 2 },
  { id: '3', title: '승인', date: '2025-07-15', color: 'blue', number: 3 },
  { id: '4', title: '거절', date: '2025-07-15', color: 'orange', number: 4 },
  { id: '5', title: '승인', date: '2025-07-16', color: 'blue', number: 5 },
  { id: '6', title: '거절', date: '2025-07-16', color: 'orange', number: 6 },
  { id: '7', title: '취소', date: '2025-07-17', color: 'red', number: 7 },
  { id: '8', title: '예약', date: '2025-07-17', color: 'purple', number: 8 },
  { id: '9', title: '완료', date: '2025-07-17', color: 'green', number: 9 },
  { id: '10', title: '취소', date: '2025-07-18', color: 'red', number: 10 },
];

export default function ReservationCalendar() {
  const [currentDate, setCurrentDate] = useState(dayjs()); //현재 시간을 가져옴
  const [events] = useState<Event[]>(sampleEvents); //이벤트 데이터를 가져옴

  // 이벤트 데이터를 날짜별로 그룹화하여 memoization으로 성능 최적화 (샘플 이벤트에 적용되는 내용이라 수정 실제 API 연동 시 수정 필요)
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

  // 핵심: dayjs 객체와 Moment.js와 유사한 API를 사용합니다.
  const monthStart = currentDate.startOf('month'); // 현재 월의 시작 날짜
  const monthEnd = currentDate.endOf('month'); // 현재 월의 마지막 날짜
  const calendarStart = monthStart.startOf('week'); // 현재 월의 첫 번째 주의 시작 날짜
  const calendarEnd = monthEnd.endOf('week'); // 현재 월의 마지막 주의 마지막 날짜

  // 날짜 배열을 생성하기 위해 반복문 사용 (currentDate 기준으로 한 달의 날짜를 가져옴)
  const days = useMemo(() => {
    const daysArr = [];
    let day = calendarStart;
    while (day.isSameOrBefore(calendarEnd)) {
      daysArr.push(day);
      day = day.add(1, 'day');
    }
    return daysArr;
  }, [calendarStart, calendarEnd]);

  const getEventsForDate = (date: dayjs.Dayjs) => {
    const formattedDate = date.format('YYYY-MM-DD');
    return eventsByDate[formattedDate] || [];
  };

  // 이벤트를 우선순위에 따라 정렬
  const sortEventsByPriority = (events: Event[]) => {
    return events.sort((a, b) => {
      const priorityA =
        PRIORITY_MAP[a.title as keyof typeof PRIORITY_MAP] ?? 999;
      const priorityB =
        PRIORITY_MAP[b.title as keyof typeof PRIORITY_MAP] ?? 999;
      return priorityA - priorityB;
    });
  };

  // 색상 클래스 매핑
  const getColorClass = (color: string) => {
    const colorMap = {
      red: 'bg-red-200 text-red-400',
      blue: 'bg-blue-200 text-blue-400',
      orange: 'bg-orange-200 text-orange-400',
      green: 'bg-green-200 text-green-400',
      purple: 'bg-purple-200 text-purple-400',
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-gray-500';
  };

  const prevMonth = () => setCurrentDate(currentDate.subtract(1, 'month'));
  const nextMonth = () => setCurrentDate(currentDate.add(1, 'month'));

  return (
    <div
      className='w-full overflow-hidden rounded-2xl border border-gray-200 bg-white font-bold'
      role='calendar'
      aria-label='예약 달력'
    >
      {/* 헤더 - 월 네비게이션 */}
      <div className='flex items-center justify-center gap-15 py-20 text-3xl'>
        <button
          onClick={prevMonth}
          className='cursor-pointer rounded p-2'
          aria-label='이전 달로 이동'
        >
          &lt;
        </button>
        <span
          id='calendar-header'
          aria-label='현재 달 표시'
          aria-atomic='true'
          aria-live='polite'
        >
          {currentDate.format('YYYY년 MM월')}
        </span>
        <button
          onClick={nextMonth}
          className='cursor-pointer rounded p-2'
          aria-label='다음 달로 이동'
        >
          &gt;
        </button>
      </div>

      {/* 요일 헤더 */}
      <div className='grid grid-cols-7 gap-1 border-b border-gray-100 py-10'>
        {WEEKDAYS.map((day, index) => (
          <div
            aria-label={`${day}요일`}
            role='columnheader'
            key={`day-${index}`}
            className={`py-2 text-center text-xl font-bold ${
              index === 0
                ? 'text-red-500'
                : index === 6
                  ? 'text-blue-500'
                  : 'text-gray-700'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div
        className='grid grid-cols-7'
        role='grid'
        aria-labelledby='calendar-header'
      >
        {days.map((day, index) => {
          const dayEvents = getEventsForDate(day);
          const isCurrentMonth = day.isSame(currentDate, 'month');
          const isToday = day.isSame(dayjs(), 'day');
          const isLastRow = index >= days.length - 7; // 마지막 줄 체크

          return (
            <div
              key={day.format('YYYY-MM-DD')}
              role='gridcell'
              aria-label={`${day.format('M월 D일')}${dayEvents.length > 0 ? `, ${dayEvents.length}개 이벤트` : ''}${isToday ? ', 오늘' : ''}`}
              aria-selected={isToday}
              aria-current={isToday ? 'date' : undefined}
              className={`relative flex min-h-[7rem] cursor-pointer flex-col items-center py-4 hover:bg-gray-50 ${!isLastRow ? 'border-b-[0.05rem] border-gray-100' : ''} ${!isCurrentMonth ? 'bg-gray-200 text-gray-400 opacity-50' : ''} ${isToday ? 'border-blue-300 bg-blue-100' : ''} `}
            >
              {/* 이벤트 레드닷 */}
              {dayEvents.length > 0 && (
                <div className='absolute top-[10%] left-3/5 size-4 rounded-full bg-red-500' />
              )}
              {/* 날짜 숫자 */}
              <div
                className={`text-xl ${
                  day.day() === 0
                    ? 'text-red-500'
                    : day.day() === 6
                      ? 'text-blue-500'
                      : 'text-gray-900'
                }`}
              >
                {day.format('D')}
              </div>

              {/* 이벤트 표시 */}
              <div className='mt-1 w-full space-y-1'>
                {sortEventsByPriority(dayEvents)
                  .slice(0, 2)
                  .map((event) => (
                    <div key={event.id} className='flex items-center'>
                      {/* 이벤트 제목 */}
                      <div
                        className={`text-md w-full truncate rounded-sm px-1 text-center font-medium ${getColorClass(
                          event.color,
                        )}`}
                        aria-label={`${event.title} ${event.number}개`}
                      >
                        {event.title}
                        {event.number}
                      </div>
                    </div>
                  ))}
                {/* 더 많은 이벤트가 있을 때 */}
                {dayEvents.length > 2 && (
                  <div
                    className='flex justify-end px-3 text-[0.8rem] text-blue-400'
                    aria-label={`${dayEvents.length - 2}개 더`}
                  >
                    +{dayEvents.length - 2}개 더
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
