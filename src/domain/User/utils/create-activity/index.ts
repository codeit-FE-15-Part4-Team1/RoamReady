import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

// dayjs 플러그인 설정
dayjs.extend(isSameOrBefore);
// 'HH:mm' 형식의 시간 파싱을 위한 플러그인 설정
dayjs.extend(customParseFormat);

//24시간 형식의 시간 옵션 생성 (00:00 ~ 23:30, 30분 간격)
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

// 시작 시간에 따라 가능한 종료 시간 옵션을 반환하는 함수
export const getEndTimeOptions = (startTime: string) => {
  console.log('함수로 들어온 startTime:', startTime);

  const start = dayjs(startTime, 'HH:mm', true);
  console.log('dayjs가 파싱했는가? (isValid):', start.isValid());

  if (!start.isValid()) {
    return timeOptions;
  }
  let anchorIndex = -1;

  // timeOptions 배열을 뒤에서부터 거꾸로 순회합니다.
  for (let i = timeOptions.length - 1; i >= 0; i--) {
    const optionTime = dayjs(timeOptions[i], 'HH:mm', true);
    // 입력된 시간(start)보다 작거나 같은 첫 번째 시간을 '기준점'으로 찾습니다.
    if (optionTime.isSameOrBefore(start)) {
      anchorIndex = i;
      break; // 기준점을 찾았으므로 반복을 중단합니다.
    }
  }
  // 기준점을 찾지 못했다면(매우 이른 시간을 입력한 경우) 전체 목록을 반환합니다.
  if (anchorIndex === -1) {
    return timeOptions;
  }
  // 찾은 기준점의 바로 다음 시간부터 배열을 잘라서 반환합니다.
  return timeOptions.slice(anchorIndex + 1);
};
