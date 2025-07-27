export const getActivityReviews = async (activityId: number) => {
  const res = await fetch(
    `${process.env.API_BASE_URL}/activities/${activityId}/reviews`,
    {
      next: { tags: ['activity-review'] },
    },
  );

  if (!res.ok) {
    throw new Error(
      `체험 리뷰 데이터를 불러오는데 실패했습니다: ${res.statusText}`,
    );
  }

  return res.json();
};
