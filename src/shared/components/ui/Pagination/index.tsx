'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useMemo, useRef } from 'react';

import { cn } from '@/shared/libs/cn';

/**
 * Pagination 컴포넌트에 전달되는 props 타입 정의
 *
 * @property currentPage - 현재 페이지 번호
 * @property totalPages - 전체 페이지 수
 * @property onPageChange - 페이지 변경 시 호출되는 콜백 함수
 * @property pageRange - 보여줄 페이지 버튼의 수 (기본값: 5)
 * @property className - 페이지 버튼 추가적인 커스터마이징 스타일을 위한 클래스 이름
 */
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageRange?: number; // default: 5
  className?: string;
}

/**
 * 페이지네이션 컴포넌트
 *
 * - 현재 페이지를 기준으로 앞/뒤 페이지 버튼을 보여줍니다.
 * - 총 페이지 수가 많을 경우 `...` 표시로 중간 페이지들을 생략합니다.
 * - 항상 첫 페이지(1)와 마지막 페이지(totalPages)는 노출됩니다.
 * - Prev / Next 버튼을 통해 한 칸씩 앞뒤로 이동할 수 있습니다.
 *
 * @param {number} currentPage - 현재 선택된 페이지 번호 (1부터 시작)
 * @param {number} totalPages - 전체 페이지 수 (최소 1 이상이어야 함)
 * @param {(page: number) => void} onPageChange - 사용자가 페이지를 클릭했을 때 호출되는 함수
 * @param {number} [pageRange=5] - 페이지 버튼을 몇 개까지 보여줄지 설정 (기본값: 5)
 *
 * @example
 * ```tsx
 * <Pagination
 *   currentPage={3}
 *   totalPages={20}
 *   onPageChange={(page) => setCurrentPage(page)}
 *   pageRange={5}
 * />
 * ```
 */
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  pageRange = 5,
  className,
}: PaginationProps) {
  // 각 페이지 번호 버튼에 대한 참조를 저장하는 Map
  const pageButtonMapRef = useRef<Map<number, HTMLButtonElement>>(new Map());

  // 유효성 검사: totalPages, currentPage, pageRange가 올바른지 확인
  const isInvalid =
    totalPages < 1 ||
    currentPage < 1 ||
    currentPage > totalPages ||
    pageRange < 1;

  const pages = useMemo(() => {
    // 입력값 검증
    if (isInvalid) return [];

    const pages: (number | 'dots')[] = [];

    const alwaysVisibleCount = pageRange;

    // 전체 페이지 수가 적으면 모든 페이지를 표시
    if (totalPages <= alwaysVisibleCount) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const halfRange = Math.floor(pageRange / 2);
    const startThreshold = halfRange + 1;
    const endThreshold = totalPages - halfRange;

    if (currentPage <= startThreshold) {
      // 앞쪽에 있을 경우
      for (let i = 1; i <= pageRange; i++) {
        pages.push(i);
      }
      if (totalPages > pageRange) {
        pages.push('dots', totalPages);
      }
    } else if (currentPage >= endThreshold) {
      // 뒤쪽에 있을 경우
      pages.push(1, 'dots');
      for (let i = totalPages - (pageRange - 1); i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 중간에 있을 경우
      pages.push(1, 'dots');
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push('dots', totalPages);
    }

    return pages;
  }, [currentPage, totalPages, pageRange]);

  // 키보드 방향키 접근성: ← → 키로 페이지 전환
  useEffect(() => {
    if (isInvalid) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      let nextPage = currentPage;

      if (e.key === 'ArrowLeft' && currentPage > 1) {
        nextPage = currentPage - 1;
      } else if (e.key === 'ArrowRight' && currentPage < totalPages) {
        nextPage = currentPage + 1;
      } else {
        return;
      }

      onPageChange(nextPage);

      // 페이지 전환 직후 DOM이 갱신되기 때문에,
      // 포커스를 안정적으로 이동시키기 위해 렌더링이 완료된 후 실행되도록 requestAnimationFrame 사용
      requestAnimationFrame(() => {
        pageButtonMapRef.current.get(nextPage)?.focus();
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages, onPageChange, pages]);

  // 페이지 번호별 버튼 요소를 Map에 등록하거나 해제하는 ref 콜백
  const getPageButtonRefCallback =
    (page: number, map: Map<number, HTMLButtonElement>) =>
    (el: HTMLButtonElement | null) => {
      if (el) {
        // 버튼이 마운트되면 해당 page 번호에 매핑
        map.set(page, el);
      } else {
        // 버튼이 언마운트되면 Map에서 제거하여 메모리 누수 방지
        map.delete(page);
      }
    };

  // 유효성 검사 메시지 출력 및 종료
  if (isInvalid) {
    if (totalPages < 1) console.error('totalPages는 최소 1 이상이어야 합니다');
    else if (currentPage < 1 || currentPage > totalPages)
      console.error(`currentPage는 1과 ${totalPages} 사이의 값이어야 합니다`);
    else if (pageRange < 1)
      console.error('pageRange는 최소 1 이상이어야 합니다');

    return null;
  }

  return (
    <div className='flex flex-col'>
      <div className='mx-auto grid auto-cols-[40px] grid-flow-col items-center gap-5'>
        {/* 이전 페이지 버튼 */}
        <button
          type='button'
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={cn(
            'flex items-center justify-center',
            currentPage === 1
              ? 'cursor-not-allowed text-gray-400'
              : 'cursor-pointer',
          )}
          aria-label='이전 페이지'
        >
          <ChevronLeft />
        </button>

        {/* 페이지 번호들 */}
        {pages.map((page, i) =>
          page === 'dots' ? (
            <div
              key={`dots-${i}`}
              className='font-size-15 text-center text-gray-400 select-none'
              aria-hidden
            >
              ...
            </div>
          ) : (
            <button
              // 각 숫자 버튼에 ref 저장 (Map으로 관리)
              ref={getPageButtonRefCallback(page, pageButtonMapRef.current)}
              type='button'
              key={page}
              onClick={() => onPageChange(page)}
              className={cn(
                'flex h-24 w-24 cursor-pointer items-center justify-center text-[15px]',
                page === currentPage
                  ? 'border-brand-2 border-b-2 font-bold text-gray-950'
                  : 'hover:border-brand-2 text-gray-400 hover:border-b-2 hover:text-gray-950',
                className,
              )}
              aria-label={`${page}페이지`}
            >
              {page}
            </button>
          ),
        )}

        {/* 다음 페이지 버튼 */}
        <button
          type='button'
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className={cn(
            'flex items-center justify-center',
            currentPage === totalPages
              ? 'cursor-not-allowed text-gray-400'
              : 'cursor-pointer',
          )}
          aria-label='다음 페이지'
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
