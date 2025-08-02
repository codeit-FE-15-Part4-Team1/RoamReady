'use client';

import { useRouter } from 'next/navigation';

import LogoSymbol from '@/shared/assets/logos/LogoSymbol';
import { ROUTES } from '@/shared/constants/routes';

import Button from '../../Button';

interface NothingProps {
  type: 'review' | 'activity' | 'reservation';
  description?: string;
  hideButton?: boolean;
}

export default function Nothing({
  type,
  description,
  hideButton,
}: NothingProps) {
  const router = useRouter();

  const message =
    type === 'review'
      ? '아직 등록된 후기가 없습니다.'
      : type === 'activity'
        ? '아직 등록한 체험이 없습니다.'
        : '아직 예약한 체험이 없습니다.';

  const buttonText = type === 'reservation' ? '둘러보기' : undefined;

  const handleClick = () => {
    router.push(ROUTES.ACTIVITIES.ROOT);
  };

  return (
    <div className='flex h-fit shrink-0 flex-col items-center justify-center gap-10 text-center'>
      <LogoSymbol className='text-brand-2 h-100 w-100' />
      <p className='font-size-13 text-gray-500'>{description || message}</p>
      {buttonText && !hideButton && (
        <Button
          type='button'
          variant='primary'
          className='font-size-13 h-40 w-100'
          onClick={handleClick}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
}
