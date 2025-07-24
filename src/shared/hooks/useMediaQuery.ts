import { useEffect, useState } from 'react';

/**
 * useMediaQuery
 * 주어진 미디어 쿼리에 따라 현재 화면이 조건을 만족하는지 여부를 반환하는 커스텀 훅
 *
 * @param query - CSS 미디어 쿼리 문자열 (예: '(max-width: 768px)')
 * @returns 현재 뷰포트가 미디어 쿼리를 만족하면 true, 그렇지 않으면 false
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)');
 * return <div>{isMobile ? '모바일 뷰' : '데스크탑 뷰'}</div>;
 */
export const useMediaQuery = (query: string): boolean => {
  // 미디어 쿼리를 만족하는지 여부를 상태로 관리
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // window.matchMedia를 통해 미디어 쿼리 객체 생성
    const media = window.matchMedia(query);

    // 현재 match 상태와 실제 media.matches 값이 다르면 상태를 동기화
    if (media.matches !== matches) setMatches(media.matches);

    // 미디어 쿼리 상태가 변경될 때 실행될 이벤트 핸들러 정의
    const listener = () => setMatches(media.matches);

    // media 쿼리 객체에 'change' 이벤트 리스너 등록
    media.addEventListener('change', listener);

    // 컴포넌트 언마운트 시 리스너 제거
    return () => media.removeEventListener('change', listener);
  }, [matches, query]); // matches 또는 query가 변경되면 useEffect 재실행

  return matches;
};
