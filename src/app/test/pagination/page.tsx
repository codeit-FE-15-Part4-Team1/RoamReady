'use client';

import { useState } from 'react';
import Pagination from '@/shared/components/ui/Pagination';

/**
 * PaginationTestPage
 *
 * 페이지네이션 컴포넌트를 테스트하기 위한 임시 테스트 페이지입니다.
 * - 현재 페이지 상태를 보여주고
 * - 페이지 버튼을 클릭하면 현재 페이지가 변경됩니다.
 */
export default function PaginationTestPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 20;

  // 페이지 변경 시 호출되는 함수
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-20'>
      <h1 className='mb-4 text-2xl font-semibold text-gray-800'>
        Pagination 컴포넌트 테스트
      </h1>
      <p className='mb-8 text-gray-600'>
        아래의 페이지네이션을 클릭하면 현재 페이지가 변경됩니다.
      </p>

      {/* 현재 페이지 상태 표시 */}
      <div className='text-brand-2 mb-6 text-lg font-medium'>
        현재 페이지: <span className='font-bold'>{currentPage}</span>
      </div>

      {/* Pagination 컴포넌트 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        pageRange={5}
      />
    </div>
  );
}
