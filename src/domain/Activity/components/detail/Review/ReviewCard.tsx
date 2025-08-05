import { Star } from 'lucide-react';

import ExpandableReview from '@/domain/Activity/components/detail/Review/ExpandableReview';
import Avatar from '@/shared/components/ui/avatar';

import { Review } from '../../../types/detail/types';
import { getTimeAgo } from '../../../utils/getTimeAgo';

/**
 * ReviewCard 컴포넌트
 * 상세페이지에서 사용자 리뷰 정보를 카드 형태로 보여주는 컴포넌트입니다.
 *
 * - 닉네임, 작성일, 별점, 리뷰 내용을 표시합니다.
 * - `updatedAt`을 기반으로 상대 시간(예: "2일 전")을 표시합니다.
 *
 * @component
 * @param {Review} review - 리뷰 객체
 * @param {number} review.rating - 리뷰 별점 (1~5)
 * @param {string} review.updatedAt - 마지막 수정 날짜 (ISO 8601 문자열)
 * @param {string} review.content - 리뷰 본문 내용
 * @param {{ nickname: string }} review.user - 작성자 정보 (닉네임 포함)
 *
 * @example
 * const review = {
 *   rating: 4,
 *   updatedAt: '2025-07-16T12:00:00Z',
 *   content: '정말 즐거운 체험이었어요!',
 *   user: { nickname: '홍길동', profileImageUrl: '', id: 1 },
 *   ...
 * };
 *
 * return <ReviewCard {...review} />;
 */
export default function ReviewCard(review: Review) {
  const { rating, user, updatedAt, content } = review;

  const date = getTimeAgo(updatedAt);

  return (
    <article className='flex h-fit flex-col gap-[1.2rem] rounded-4xl bg-white p-20 shadow-[0_4px_20px_rgba(0,0,0,0.05)]'>
      <div className='flex flex-col gap-10'>
        <div className='flex items-center justify-start gap-10'>
          <Avatar profileImageUrl={user.profileImageUrl} />
          <span className='font-size-16 font-bold text-gray-950'>
            {user.nickname}
          </span>
          <span className='font-size-10 font-medium text-gray-200'>{date}</span>
        </div>
        <div className='flex gap-1'>
          {[...Array(5)].map((_, index) => {
            const isFilled = index < rating;
            return (
              <Star
                key={index}
                size={13}
                className={`${
                  isFilled
                    ? 'fill-[#FFCB02] stroke-[#FFCB02]'
                    : 'fill-gray-100 stroke-gray-100'
                }`}
              />
            );
          })}
        </div>
      </div>
      <ExpandableReview text={content} />
    </article>
  );
}
