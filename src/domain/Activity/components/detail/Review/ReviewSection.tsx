'use client';
import { Angry, Frown, Meh, Smile, SmilePlus, Star } from 'lucide-react';
import { useState } from 'react';

import { ReviewList } from '@/domain/Activity/types/detail/types';
import Pagination from '@/shared/components/ui/Pagination';

import ReviewCard from './ReviewCard';

const getRatingInfo = (rating: number) => {
  if (rating >= 4.5)
    return { message: '매우 만족', Icon: SmilePlus, color: '#22c55e' }; // 초록
  if (rating >= 3.5) return { message: '만족', Icon: Smile, color: '#84cc16' }; // 연두
  if (rating >= 2.5) return { message: '보통', Icon: Meh, color: '#eab308' }; // 노랑
  if (rating >= 1.5)
    return { message: '불만족', Icon: Frown, color: '#f97316' }; // 주황
  return { message: '매우 불만족', Icon: Angry, color: '#ef4444' }; // 빨강
};

const REVIEWS_PER_PAGE = 3; // 페이지당 리뷰 개수

export default function ReviewSection({ review }: { review: ReviewList }) {
  const avgRating = review.averageRating;
  const { message, Icon, color } = getRatingInfo(avgRating);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 전체 페이지 수 계산 (올림 처리)
  const totalPages = Math.ceil(review.totalCount / REVIEWS_PER_PAGE);

  // 현재 페이지에 보여줄 리뷰만 추출
  const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
  const currentReviews = review.reviews.slice(
    startIndex,
    startIndex + REVIEWS_PER_PAGE,
  );

  console.log(review.totalCount);

  return (
    <section className='flex flex-col gap-40'>
      <div>
        <div className='flex items-center justify-start gap-5'>
          <h2 className='font-size-18 leading-none font-bold'>체험 후기</h2>
          <span className='font-size-16 text-gray-550 leading-none font-bold'>
            {review.totalCount}개
          </span>
        </div>

        <div className='flex flex-col gap-6'>
          <div className='flex flex-col items-center justify-center'>
            <span className='font-size-32 font-bold'>
              {avgRating.toFixed(1)}
            </span>
            <div className='font-size-16 flex items-center gap-5 font-medium'>
              <Icon size={20} style={{ color }} />
              <span className='font-size-16 font-bold'>{message}</span>
            </div>
          </div>

          <div className='flex items-center justify-center gap-2'>
            <Star size={13} className='fill-[#FFCB02] stroke-[#FFCB02]' />
            <span className='font-size-14 text-gray-550 font-medium'>
              {review.totalCount.toLocaleString()}개 후기
            </span>
          </div>
        </div>

        <div className='mt-20 flex h-fit min-h-600 flex-col gap-20'>
          {currentReviews.map((review) => (
            <ReviewCard key={review.id} {...review} />
          ))}
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
}
