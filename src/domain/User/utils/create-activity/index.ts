// src/utils/time.ts
import dayjs from 'dayjs';

/**
 * 24시간 형식의 시간 옵션 생성 (00:00 ~ 23:30, 30분 간격)
 */
export const timeOptions = (() => {
  const options: string[] = [];
  const end = dayjs().endOf('day');
  let current = dayjs().startOf('day');

  while (current.isBefore(end)) {
    options.push(current.format('HH:mm'));
    current = current.add(30, 'minute');
  }

  return options;
})();

/**
 * 시작 시간을 기준으로 종료 시간 옵션을 필터링합니다.
 * @param startTime 선택된 시작 시간 ('HH:mm')
 * @returns 시작 시간 이후의 시간 옵션 배열
 */
export const getEndTimeOptions = (startTime: string) => {
  if (!startTime) return timeOptions;

  const startTimeIndex = timeOptions.findIndex((time) => time === startTime);
  if (startTimeIndex === -1) return timeOptions;

  // 시작 시간 다음 옵션부터 반환
  return timeOptions.slice(startTimeIndex + 1);
};
