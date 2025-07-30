import { MapPin, Star } from 'lucide-react';

import { Activity, ReviewList } from '@/domain/Activity/types/detail/types';

import ActivityDropdown from './ActivityDropdown';

interface ActivitySummaryProps {
  activity: Activity;
  review: ReviewList;
}

/**
 * ActivitySummary
 * 체험 상세 페이지 상단에서 카테고리, 제목, 평점, 주소 정보를 요약해서 보여주는 컴포넌트
 *
 * @param activity - 체험의 기본 정보 객체 (카테고리, 제목, 주소, id 등 포함)
 * @param review - 체험에 대한 리뷰 정보 객체 (평점 평균 및 전체 리뷰 수 포함)
 * @returns 체험 요약 정보를 시각적으로 구성한 section 요소
 *
 * @example
 * <ActivitySummary activity={activityData} review={reviewData} />
 */
export default function ActivitySummary({
  activity,
  review,
}: ActivitySummaryProps) {
  return (
    <section className='flex w-full flex-col items-start gap-8'>
      {/* 상단: 카테고리, 제목, 드롭다운 */}
      <div className='flex w-full items-start justify-between'>
        <div className='flex flex-col gap-8'>
          {/* 체험 카테고리 */}
          <span className='font-size-14 font-medium'>{activity.category}</span>

          {/* 체험 제목 */}
          <h1 className='font-size-24 font-bold'>{activity.title}</h1>
        </div>

        {/* 체험 드롭다운 메뉴 (수정/삭제) */}
        <ActivityDropdown id={activity.id} ownerId={activity.userId} />
      </div>

      {/* 평점 영역 */}
      <div className='flex items-center gap-6'>
        <Star className='fill-[#FFCB02] stroke-[#FFCB02]' size={16} />
        <span className='font-size-14 flex items-center font-medium text-gray-700'>
          {review.averageRating.toFixed(1)} {`(${review.totalCount})`}
        </span>
      </div>

      {/* 주소 영역 */}
      <div className='flex items-center gap-6'>
        <MapPin size={10} />
        <span className='font-size-14 flex items-center font-medium text-gray-700'>
          {activity.address}
        </span>
      </div>
    </section>
  );
}
