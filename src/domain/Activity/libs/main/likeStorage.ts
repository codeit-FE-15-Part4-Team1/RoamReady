const LIKES_STORAGE_KEY = 'activity-card-likes';

export const getLikes = (): number[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  const storedLikes = localStorage.getItem(LIKES_STORAGE_KEY);
  if (storedLikes) {
    try {
      return JSON.parse(storedLikes);
    } catch (e) {
      console.error('로컬스토리지에서 좋아요를 파싱하는 데에 실패했습니다.', e);
      return [];
    }
  }
  return [];
};

export const setLikes = (likes: number[]): void => {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(likes));
};
