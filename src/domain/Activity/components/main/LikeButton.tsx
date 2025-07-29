'use client';

import { MouseEvent, useCallback, useEffect, useState } from 'react';

import { getLikes, setLikes } from '@/domain/Activity/libs/main/likeStorage';
import { Activity } from '@/domain/Activity/schemas/main/activity';
import { Heart } from '@/shared/components/icons/Heart';
import { useRoamReadyStore } from '@/shared/store';

interface LikeButtonProps {
  activity: Activity;
}

export default function LikeButton({ activity }: LikeButtonProps) {
  const activityId = activity.id;
  // 3. Zustand 스토어에서 user 정보를 가져옵니다.
  const user = useRoamReadyStore((state) => state.user);
  const [filled, setFilled] = useState(false);

  // 4. 컴포넌트가 마운트되거나 user, activityId가 변경될 때 초기 '좋아요' 상태를 설정합니다.
  useEffect(() => {
    // 로그인 상태가 아니면 항상 false
    if (!user) {
      setFilled(false);
      return;
    }
    const likedIds = getLikes();
    setFilled(likedIds.includes(activityId));
  }, [user, activityId]);

  const handleHeartClick = useCallback(
    (e: MouseEvent<SVGElement>) => {
      e.preventDefault();
      e.stopPropagation();

      // 5. 로그인 상태가 아니면, 로그인 유도 후 함수를 종료합니다.
      if (!user) {
        alert('로그인이 필요한 기능입니다.');
        return;
      }

      const currentLikes = getLikes();
      const isLiked = currentLikes.includes(activityId);

      let newLikes: number[];

      if (isLiked) {
        // 이미 좋아요를 눌렀다면, 목록에서 제거 (좋아요 취소)
        newLikes = currentLikes.filter((id: number) => id !== activityId);
      } else {
        // 누르지 않았다면, 목록에 추가 (좋아요)
        newLikes = [...currentLikes, activityId];
      }

      // 6. 변경된 목록을 localStorage에 저장하고, UI 상태를 업데이트합니다.
      setLikes(newLikes);
      setFilled(!isLiked);
    },
    [user, activityId],
  );

  return (
    <div className='flex-center size-25 active:scale-90'>
      <Heart
        className='size-23 cursor-pointer'
        filled={filled}
        onClick={handleHeartClick}
      />
    </div>
  );
}
