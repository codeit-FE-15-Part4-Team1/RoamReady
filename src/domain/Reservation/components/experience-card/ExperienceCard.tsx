import Image from 'next/image';

import { Activity } from '@/domain/Activity/schemas/main';

interface ExperienceCardProps {
  activity: Activity;
}

export default function ExperienceCard({ activity }: ExperienceCardProps) {
  return (
    <article className='border-brand-1 flex rounded-3xl border bg-white shadow-lg'>
      <figure>
        <Image
          src={activity.bannerImageUrl}
          alt={activity.title}
          width={120}
          height={120}
          className='rounded-l-3xl object-cover'
        />
      </figure>
    </article>
  );
}
