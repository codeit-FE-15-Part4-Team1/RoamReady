import dayjs from 'dayjs';

import type { Event } from '../../types/event';
import { getColorClass, sortEventsByPriority } from '../../utils/reservation';

interface DayCellProps {
  day: dayjs.Dayjs;
  isCurrentMonth: boolean;
  isToday: boolean;
  isLastRow: boolean;
  events: Event[];
}

export default function DayCell({
  day,
  isCurrentMonth,
  isToday,
  isLastRow,
  events,
}: DayCellProps) {
  const sortedEvents = sortEventsByPriority(events);

  const cellClasses = `
    relative flex min-h-[7rem] cursor-pointer flex-col items-center py-12 
    hover:bg-gray-50 
    ${!isLastRow ? 'border-b-[0.05rem] border-gray-100' : ''} 
    ${!isCurrentMonth ? 'bg-gray-200 text-gray-400 opacity-50' : ''} 
    ${isToday ? 'border-blue-300 bg-blue-100' : ''}
  `;

  const dateClasses = `
    text-xl
    ${day.day() === 0 ? 'text-red-500' : ''}
    ${day.day() === 6 ? 'text-blue-500' : ''}
    ${isCurrentMonth ? 'text-gray-900' : ''}
  `;

  return (
    <div
      role='gridcell'
      aria-label={`${day.format('M월 D일')}`}
      className={cellClasses}
    >
      {events.length > 0 && (
        <div className='absolute top-[10%] left-[60%] size-4 rounded-full bg-red-500' />
      )}

      <div className={dateClasses}>{day.format('D')}</div>

      <div className='mt-1 w-full space-y-1'>
        {sortedEvents.slice(0, 2).map((event) => (
          <div
            key={event.id}
            className={`text-md w-full truncate rounded-sm px-1 text-center font-medium ${getColorClass(event.color)}`}
          >
            {event.title} {event.number}
          </div>
        ))}
        {events.length > 2 && (
          <div className='flex justify-end px-3 text-[0.8rem] text-blue-400'>
            +{events.length - 2}개 더
          </div>
        )}
      </div>
    </div>
  );
}
