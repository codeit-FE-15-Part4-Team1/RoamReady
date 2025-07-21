import ReviewCard from '@/domain/Activity/components/detail/ReviewCard';
import { Review } from '@/domain/Activity/types/detail/types';

export default function ReviewCardTestPage() {
  const review: Review = {
    id: 0,
    user: {
      profileImageUrl: '',
      nickname: '테스트 유저',
      id: 0,
    },
    activityId: 0,
    rating: 4,
    content: `저는 저희 스트릿 댄서 체험에 참가하게 된 지 얼마 안됐지만, 정말 즐거운
        시간을 보냈습니다. 새로운 스타일과 춤추기를 좋아하는 나에게 정말 적합한
        체험이었고, 전문가가 직접 강사로 참여하기 때문에 어떤 수준의 춤추는
        사람도 쉽게 이해할 수 있었습니다. 강사님께서 정말 친절하게 설명해주셔서
        정말 좋았고, 이번 체험을 거쳐 새로운 스타일과 춤추기에 대한 열정이 더욱
        생겼습니다. 저는 이 체험을 적극 추천합니다!" 저는 저희 스트릿 댄서
        체험에 참가하게 된 지 얼마 안됐지만, 정말 즐거운 시간을 보냈습니다.
        새로운 스타일과 춤추기를 좋아하는 나에게 정말 적합한 체험이었고,
        전문가가 직접 강사로 참여하기 때문에 어떤 수준의 춤추는 사람도 쉽게
        이해할 수 있었습니다. 강사님께서 정말 친절하게 설명해주셔서 정말 좋았고,
        이번 체험을 거쳐 새로운 스타일과 춤추기에 대한 열정이 더욱 생겼습니다.
        저는 이 체험을 적극 추천합니다!`,
    createdAt: '2025-07-16T12:00:00Z',
    updatedAt: '2025-07-15T12:00:00Z',
  };

  return (
    <div className='mx-30 flex h-screen flex-col items-center justify-center gap-30'>
      <ReviewCard {...review} />
      <ReviewCard {...review} />
      <ReviewCard {...review} />
      <ReviewCard {...review} />
    </div>
  );
}
