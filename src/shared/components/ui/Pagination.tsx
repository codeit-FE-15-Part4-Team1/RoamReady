'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/shared/libs/cn';

/**
 * Pagination 컴포넌트에 전달되는 props 타입 정의
 *
 * @property currentPage - 현재 페이지 번호
 * @property totalPages - 전체 페이지 수
 * @property onPageChange - 페이지 변경 시 호출되는 콜백 함수
 * @property pageRange - 보여줄 페이지 버튼의 수 (기본값: 5)
 */
type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageRange?: number; // default: 5
};

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
}: PaginationProps) {
  const generatePages = () => {
    const pages: (number | 'dots')[] = [];

    const alwaysVisibleCount = pageRange; // 5개 고정

    // 전체 페이지 수가 적으면 모든 페이지를 표시
    if (totalPages <= alwaysVisibleCount) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const startThreshold = 3;
    const endThreshold = totalPages - 2;

    if (currentPage <= startThreshold) {
      // 앞쪽에 있을 경우
      pages.push(1, 2, 3, 4, 5, 'dots', totalPages);
    } else if (currentPage >= endThreshold) {
      // 뒤쪽에 있을 경우
      pages.push(1, 'dots');
      for (let i = totalPages - 4; i <= totalPages; i++) {
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
  };

  const pages = generatePages();

  return (
    <div className='flex flex-col'>
      <div className='mx-auto grid auto-cols-[40px] grid-flow-col items-center gap-5'>
        {/* 이전 페이지 버튼 */}
        <button
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
              className='text-15 text-center text-gray-400 select-none'
              aria-hidden
            >
              ...
            </div>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={cn(
                'flex h-24 w-24 cursor-pointer items-center justify-center text-[15px]',
                page === currentPage
                  ? 'border-brand-2 border-b-2 font-bold text-gray-950'
                  : 'text-gray-400 hover:text-gray-950',
              )}
              aria-label={`${page}페이지`}
            >
              {page}
            </button>
          ),
        )}

        {/* 다음 페이지 버튼 */}
        <button
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
