// 필요한 React 훅과 Next.js 훅 import
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

import { MENU_ITEMS } from '../constants/menuItems';

// 마이페이지 메뉴 관련 로직을 처리하는 커스텀 훅 정의
export const useMyPageMenu = () => {
  // 현재 경로(pathname)를 가져옴 — 예: /mypage/info
  const path = usePathname();

  // 현재 마우스 hover 중인 메뉴 항목의 href를 저장 (없으면 null)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // <ul> 요소의 참조를 저장 — 메뉴 전체 영역 참조
  const navRef = useRef<HTMLUListElement>(null);

  // 각 <li> 요소에 대한 참조를 href 기준으로 저장하는 Map 객체
  const itemRefs = useRef<Map<string, HTMLLIElement>>(new Map());

  // 메뉴 하이라이트 배경(div)의 위치 및 크기 상태
  const [highlightStyle, setHighlightStyle] = useState({
    top: 0, // 상단 위치 (px)
    height: 0, // 높이 (px)
    opacity: 0, // 투명도 (0이면 숨김)
  });

  // 메뉴 항목 목록 (상수)
  const menuItems = MENU_ITEMS;

  // 현재 경로와 일치하거나 하위 경로인지를 판별하는 함수
  const isActive = useCallback(
    (href: string) => path === href || path.startsWith(href + '/'),
    [path], // 경로가 바뀔 때마다 새로 계산
  );

  // 현재 hover된 항목 또는 현재 경로에 해당하는 활성 메뉴 항목의 href를 반환
  const getActiveHref = useCallback(() => {
    const activeItem = menuItems.find((item) => isActive(item.href));
    return hoveredItem || activeItem?.href || null;
  }, [hoveredItem, menuItems, isActive]);

  // 현재 활성된 항목에 따라 하이라이트(배경)의 위치와 크기 상태를 업데이트
  const updateHighlightStyle = useCallback(() => {
    const targetId = getActiveHref(); // 하이라이트 대상 href

    // 유효한 항목이 없으면 하이라이트를 숨김
    if (!targetId) {
      setHighlightStyle({ opacity: 0, top: 0, height: 0 });
      return;
    }

    // 해당 href에 매핑된 DOM 노드(li)를 가져옴
    const targetNode = itemRefs.current.get(targetId);

    // 노드가 없으면 하이라이트를 숨김
    if (!targetNode) {
      setHighlightStyle({ opacity: 0, top: 0, height: 0 });
      return;
    }

    // 노드가 존재하면 해당 위치로 하이라이트 스타일을 설정
    setHighlightStyle({
      top: targetNode.offsetTop,
      height: targetNode.offsetHeight,
      opacity: 1,
    });
  }, [getActiveHref]);

  // 경로 변경 또는 hover 항목 변경 시 하이라이트 위치를 재계산
  useEffect(() => {
    updateHighlightStyle();
  }, [path, hoveredItem, updateHighlightStyle]);

  // 윈도우 리사이즈 시 하이라이트 위치도 재계산 (메뉴 크기 변동 대비)
  useEffect(() => {
    const handleResize = () => {
      requestAnimationFrame(updateHighlightStyle); // 리렌더 이후에 실행되도록
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateHighlightStyle]);

  /**
   * 각 메뉴 항목(li 요소)의 참조를 등록 또는 해제
   * - mount 시 node 등록
   * - unmount 시 node 삭제
   */
  const setItemRef = (href: string, node: HTMLLIElement | null) => {
    if (node) {
      itemRefs.current.set(href, node);
    } else {
      itemRefs.current.delete(href);
    }
  };

  // 훅에서 필요한 상태와 함수들을 반환하여 외부에서 사용 가능하게 함
  return {
    path, // 현재 경로
    menuItems, // 메뉴 항목 배열
    hoveredItem, // 현재 hover된 항목
    navRef, // 전체 메뉴 <ul> 참조
    highlightStyle, // 하이라이트 배경 스타일 상태
    setItemRef, // 각 항목의 ref 등록 함수
    setHoveredItem, // hover 상태 설정 함수
    isActive, // 특정 href가 활성 상태인지 판별하는 함수
  };
};
