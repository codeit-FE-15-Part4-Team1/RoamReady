import Image from 'next/image';

import { Activity } from '../../schemas/main';

interface ActivityCardProp {
  activity: Activity;
}

export default function ActivityCard({ activity }: ActivityCardProp) {
  const { bannerImageUrl, title, price, rating } = activity;
  return (
    <article className='tablet:max-w-330 desktop:max-w-220 w-full max-w-155 rounded-3xl bg-white p-4 shadow-md'>
      <figure className='relative h-3/4 w-full overflow-hidden rounded-3xl'>
        <Image
          src={bannerImageUrl}
          alt={`${title} 액티비티 이미지`}
          width={200}
          height={200}
          className='object-cover'
        />
      </figure>
      <section className='h-1/4 w-full'>adsfsadf</section>
    </article>
  );
}
