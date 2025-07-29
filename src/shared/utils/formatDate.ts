/**
 * Date 객체를 'yyyy. M. d.' 형식의 문자열로 변환하는 함수
 * @param {Date | null | undefined} date - 변환할 Date 객체
 * @returns {string} 포맷팅된 날짜 문자열
 */
export const formatDate = (date: Date) => {
  if (!date) return '';

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}. ${month}. ${day}`;
};
