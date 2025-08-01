import { notFound } from 'next/navigation';

import ActivityImg from '@/domain/Activity/components/detail/activity-img/ActivityImg';
import DescriptionSection from '@/domain/Activity/components/detail/description/DescriptionSection';
import KaKaoMap from '@/domain/Activity/components/detail/kakao-map/KaKaoMap';
import { getActivityDetail } from '@/domain/Activity/services/detail';

interface Props {
  id: string;
}

export default async function ActivityOnlySection({ id }: Props) {
  const activity = await getActivityDetail(Number(id)).catch((error) => {
    if (error?.status === 404) notFound();
    throw error;
  });

  return (
    <>
      <ActivityImg
        bannerImage={activity.bannerImageUrl}
        subImages={activity.subImages}
      />
      <DescriptionSection description={activity.description} />
      <section className='flex w-full flex-col justify-center gap-8 border-b border-gray-100 pb-40'>
        <h2 className='font-size-18 font-bold'>오시는 길</h2>
        <KaKaoMap address={activity.address} className='tablet:h-450 h-250' />
      </section>
    </>
  );
}
