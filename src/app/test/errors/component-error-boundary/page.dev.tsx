'use client';

import { Angry, Frown, Meh, Smile, SmilePlus, Star } from 'lucide-react';
import { useState } from 'react';

import ComponentErrorBoundary from '@/shared/components/errors/ComponentErrorBoundary';
import Pagination from '@/shared/components/ui/Pagination';

interface Review {
  id: number;
  text: string;
  author: string;
}

const getRatingInfo = (rating: number) => {
  if (rating >= 4.5)
    return { message: '매우 만족', Icon: SmilePlus, color: '#22c55e' };
  if (rating >= 3.5) return { message: '만족', Icon: Smile, color: '#84cc16' };
  if (rating >= 2.5) return { message: '보통', Icon: Meh, color: '#eab308' };
  if (rating >= 1.5)
    return { message: '불만족', Icon: Frown, color: '#f97316' };
  return { message: '매우 불만족', Icon: Angry, color: '#ef4444' };
};

const REVIEWS_PER_PAGE = 3;

/**
 * 테스트용 리뷰 카드 컴포넌트입니다.
 * ID가 2인 리뷰일 경우 고의적으로 렌더링 에러를 발생시킵니다.
 */
function FailingReviewCard({ review }: { review: Review }) {
  // 고의적으로 에러 발생
  if (review.id === 2) {
    if (process.env.NODE_ENV === 'development') {
      throw new Error('Test Error: This review card failed to render.');
    }
  }

  return (
    <div className='rounded-lg border bg-white p-4 shadow-sm'>
      <p className='font-semibold'>{review.author}</p>
      <p className='text-gray-600'>{review.text}</p>
    </div>
  );
}

/**
 * @description
 * 이 컴포넌트는 컴포넌트 에러 바운더리(ComponentErrorBoundary)의 기능을 테스트하기 위한 페이지입니다.
 * - `ComponentErrorBoundary`는 리스트로 렌더링되는 개별 `FailingReviewCard` 컴포넌트를 감싸서,
 * 특정 카드에서 의도적으로 발생하는 렌더링 에러를 개별적으로 처리합니다.
 * - 이 테스트를 통해 하나의 자식 컴포넌트 에러가 전체 UI를 중단시키지 않고,
 * 문제 있는 부분만 `fallback` UI로 대체되는지 확인할 수 있습니다.
 * - 이 코드는 테스트 목적으로 작성되었으며, 실제 프로젝트의 ReviewList 타입 및 데이터 구조와 다를 수 있습니다.
 */
function TestReviewSection() {
  const [page, setPage] = useState(1);

  const mockReviews = [
    {
      id: 1,
      text: '첫 번째 리뷰입니다. 정상적으로 렌더링됩니다.',
      author: '테스트유저1',
    },
    {
      id: 2,
      text: '두 번째 리뷰입니다. 이 리뷰는 에러가 발생합니다.',
      author: '테스트유저2',
    },
    {
      id: 3,
      text: '세 번째 리뷰입니다. 정상적으로 렌더링됩니다.',
      author: '테스트유저3',
    },
    {
      id: 4,
      text: '네 번째 리뷰입니다. 정상적으로 렌더링됩니다.',
      author: '테스트유저4',
    },
    {
      id: 5,
      text: '다섯 번째 리뷰입니다. 정상적으로 렌더링됩니다.',
      author: '테스트유저5',
    },
    {
      id: 6,
      text: '여섯 번째 리뷰입니다. 정상적으로 렌더링됩니다.',
      author: '테스트유저6',
    },
  ];

  const totalCount = mockReviews.length;
  const totalPages = Math.ceil(totalCount / REVIEWS_PER_PAGE);

  const startIndex = (page - 1) * REVIEWS_PER_PAGE;
  const endIndex = startIndex + REVIEWS_PER_PAGE;
  const currentReviews = mockReviews.slice(startIndex, endIndex);

  const averageRating = 4.2;
  const { message, Icon, color } = getRatingInfo(averageRating);

  return (
    <section className='flex-col-center font-size-20 min-h-screen w-full gap-30 rounded-lg bg-gray-100 p-8'>
      <div className='flex flex-col gap-15'>
        <div className='flex items-center justify-start gap-5'>
          <h2 className='font-size-25 font-bold'>체험 후기 (테스트)</h2>
          <span className='text-gray-550 font-size-20 font-bold'>
            {totalCount}개
          </span>
        </div>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col items-center justify-center'>
            <span className='font-size-32 font-bold'>
              {averageRating.toFixed(1)}
            </span>
            <div className='font-size-20 flex items-center gap-5 font-medium'>
              <Icon size={20} style={{ color }} />
              <span className='font-size-16 font-bold'>{message}</span>
            </div>
          </div>
          <div className='flex items-center justify-center gap-2'>
            <Star size={13} className='fill-[#FFCB02] stroke-[#FFCB02]' />
            <span className='text-gray-550 font-size-16 font-medium'>
              {totalCount.toLocaleString()}개 후기
            </span>
          </div>
        </div>
        <div className='flex h-fit min-h-400 min-w-400 flex-col gap-20'>
          {currentReviews.map((review) => (
            <ComponentErrorBoundary key={review.id}>
              <FailingReviewCard
                review={review}
                // fallback={<div className='rounded-lg border border-red-300 bg-red-50 p-4 font-size-15 text-red-700'> 리뷰를 표시하는 데 문제가 발생했습니다.</div>}
              />
            </ComponentErrorBoundary>
          ))}
        </div>
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(p) => setPage(p)}
      />
    </section>
  );
}

export default function TestPage() {
  return (
    <div className='p-8'>
      <h1 className='mb-8 text-3xl font-bold'>
        Component Error Boundary Test Page
      </h1>
      <TestReviewSection />
    </div>
  );
}
