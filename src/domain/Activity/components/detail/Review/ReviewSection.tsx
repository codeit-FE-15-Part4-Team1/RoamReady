'use client';
import { Angry, Frown, Meh, Smile, SmilePlus, Star } from 'lucide-react';
import { useState } from 'react';

import { useActivityReviews } from '@/domain/Activity/hooks/detail/useActivityReviews';
import { ReviewList } from '@/domain/Activity/types/detail/types';
import Nothing from '@/shared/components/ui/nothing';
import Pagination from '@/shared/components/ui/Pagination';

import ReviewCard from './ReviewCard';

/**
 * 평점 숫자(rating)를 기반으로 사용자에게 표시할 메시지, 아이콘, 색상을 반환합니다.
 *
 * @param {number} rating - 1.0 ~ 5.0 사이의 평점 값
 * @returns {{
 *   message: string;
 *   Icon: React.ElementType;
 *   color: string;
 * }} - 메시지, 아이콘 컴포넌트, 색상(hex 코드)로 구성된 객체
 */
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

/**
 * ReviewSection
 * 체험 후기 섹션을 구성하며, 평균 평점에 따른 이모지/색상 표시, 리뷰 리스트, 페이지네이션을 포함한 컴포넌트
 *
 * @param activityId - 체험 ID
 * @param initialReviews - 서버에서 사전 패칭된 1페이지 리뷰 데이터 (SSR/ISR 시 초기 렌더 최적화 목적)
 * @returns 평균 평점에 따른 시각적 표현, 개별 리뷰 카드 리스트, 페이지네이션 UI가 포함된 section 요소
 *
 * @remarks
 * - `initialReviews`는 React Query의 `initialData`로 전달되어 1페이지 데이터에 대해서만 초기 캐시를 설정합니다.
 * - 이후 페이지 전환 시(page > 1)에는 클라이언트에서 비동기적으로 새 리뷰 데이터를 요청합니다.
 * - 리뷰 등록 후에는 `invalidateQueries(['activity-reviews', activityId, 1])`로 1페이지를 수동 무효화하여 최신 데이터로 갱신해야 합니다.
 */
export default function ReviewSection({
  activityId,
  initialReviews,
}: {
  activityId: number;
  initialReviews: ReviewList;
}) {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useActivityReviews(
    activityId,
    page,
    REVIEWS_PER_PAGE,
    initialReviews,
  );

  // 로딩 중 또는 데이터 없으면 로딩 UI 표시
  if (isLoading || !data) {
    return <div>로딩 중...</div>;
  }

  // 리뷰가 없는 경우 Nothing 컴포넌트 렌더링
  if (data.totalCount === 0) {
    return (
      <section className='flex-col-center desktop:gap-50 w-full gap-30'>
        <div className='flex w-full items-center justify-start gap-5'>
          <h2 className='font-size-18 leading-none font-bold'>체험 후기</h2>
          <span className='font-size-16 text-gray-550 leading-none font-bold'>
            0개
          </span>
        </div>
        <Nothing type='review' />
      </section>
    );
  }

  const { averageRating, reviews, totalCount } = data;
  const totalPages = Math.ceil(totalCount / REVIEWS_PER_PAGE);
  const { message, Icon, color } = getRatingInfo(averageRating); // 평균 평점에 따른 시각 요소 추출

  return (
    <section className='flex-col-center w-full gap-30'>
      <div className='flex w-full flex-col gap-15'>
        {/* 헤더: "체험 후기" 제목 + 총 개수 */}
        <div className='flex items-center justify-start gap-5'>
          <h2 className='font-size-18 leading-none font-bold'>체험 후기</h2>
          <span className='font-size-16 text-gray-550 leading-none font-bold'>
            {totalCount}개
          </span>
        </div>

        {/* 평균 평점 시각화: 숫자 + 이모지 + 메시지 */}
        <div className='flex flex-col gap-6'>
          <div className='flex-col-center'>
            <span className='font-size-32 font-bold'>
              {averageRating.toFixed(1)}
            </span>
            <div className='font-size-16 flex items-center gap-5 font-medium'>
              <Icon size={20} style={{ color }} />
              <span className='font-size-16 font-bold'>{message}</span>
            </div>
          </div>

          {/* 별 아이콘과 총 후기 개수 표시 */}
          <div className='flex-center gap-2'>
            <Star size={13} className='fill-[#FFCB02] stroke-[#FFCB02]' />
            <span className='font-size-14 text-gray-550 font-medium'>
              {totalCount.toLocaleString()}개 후기
            </span>
          </div>
        </div>

        {/* 현재 페이지의 리뷰 카드 목록 */}
        <div className='flex h-fit min-h-400 flex-col gap-20'>
          {reviews.map((review) => (
            <ReviewCard key={review.id} {...review} />
          ))}
        </div>
      </div>

      {/* 페이지네이션 */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(p) => setPage(p)}
      />
    </section>
  );
}
