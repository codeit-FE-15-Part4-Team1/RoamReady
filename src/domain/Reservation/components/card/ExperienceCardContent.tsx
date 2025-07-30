import Image from 'next/image';
import { ReactNode } from 'react';

interface ExperienceCardContentProps {
  children: ReactNode;
  className?: string;
}

/**
 * ExperienceCard의 컨텐츠 컴포넌트
 * 카드의 메인 내용 영역입니다.
 */
export default function ExperienceCardContent({
  children,
}: ExperienceCardContentProps) {
  return (
    <article
      className={'border-brand-1 flex rounded-3xl border bg-white shadow-lg'}
    >
      <section className='desktop:px-40 flex-1 p-20 py-30'>{children}</section>
      <figure className='desktop:w-181 relative aspect-square w-136 mask-l-from-50%'>
        <div className='relative h-full w-full select-none'>
          <Image
            src='/images/image-activity-1.jpg'
            alt='액티비티 이미지'
            fill
            className='rounded-tr-3xl rounded-br-3xl object-cover'
            draggable={false}
          />
        </div>
      </figure>
    </article>
  );
}
