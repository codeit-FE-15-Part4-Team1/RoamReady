'use client';

import Link from 'next/link';
import { useState } from 'react';

import Button from '@/shared/components/Button';
export default function ButtonTestPage() {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTimeSelect = (time: string) => {
    setSelectedTime(selectedTime === time ? null : time);
  };

  const handleReservation = async () => {
    if (selectedTime) {
      setIsLoading(true);
      // API 호출 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
      alert(`예약 완료: ${selectedTime}`);
    } else {
      alert('시간을 선택해주세요');
    }
  };

  const handleLoadingDemo = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsLoading(false);
  };

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className='mx-auto max-w-6xl space-y-8'>
        <div className='text-center'>
          <h1 className='mb-2 text-4xl font-bold text-gray-900'>
            Button Component
          </h1>
          <p className='text-gray-600'>
            다양한 버튼 스타일과 속성들을 확인해보세요
          </p>
        </div>

        {/* Variants */}
        <div className='rounded-xl bg-white p-8 shadow-sm'>
          <h2 className='mb-6 text-2xl font-semibold text-gray-900'>
            Variants
          </h2>
          <div className='flex flex-wrap gap-4'>
            <Button variant='default'>Default</Button>
            <Button variant='outline'>Outline</Button>
            <Button variant='ghost'>Ghost</Button>
            <Button variant='primary'>Primary</Button>
          </div>
        </div>

        {/* Sizes */}
        <div className='rounded-xl bg-white p-8 shadow-sm'>
          <h2 className='mb-6 text-2xl font-semibold text-gray-900'>Sizes</h2>
          <div className='flex flex-wrap items-center gap-4'>
            <Button size='small'>Small</Button>
            <Button size='medium'>Medium</Button>
            <Button size='large'>Large</Button>
          </div>
        </div>

        {/* States */}
        <div className='grid gap-8 md:grid-cols-2'>
          {/* Selected State */}
          <div className='rounded-xl bg-white p-8 shadow-sm'>
            <h2 className='mb-6 text-2xl font-semibold text-gray-900'>
              Selected State
            </h2>
            <div className='space-y-4'>
              <div className='flex gap-4'>
                <Button selected={false}>Not Selected</Button>
                <Button selected={true}>Selected</Button>
              </div>
            </div>
          </div>

          {/* Disabled State */}
          <div className='rounded-xl bg-white p-8 shadow-sm'>
            <h2 className='mb-6 text-2xl font-semibold text-gray-900'>
              Disabled State
            </h2>
            <div className='space-y-3'>
              <div className='flex flex-wrap gap-3'>
                <Button disabled>Default</Button>
                <Button variant='outline' disabled>
                  Outline
                </Button>
              </div>
              <div className='flex flex-wrap gap-3'>
                <Button variant='ghost' disabled>
                  Ghost
                </Button>
                <Button variant='primary' disabled>
                  Primary
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        <div className='rounded-xl bg-white p-8 shadow-sm'>
          <h2 className='mb-6 text-2xl font-semibold text-gray-900'>
            Loading State
          </h2>
          <div className='space-y-6'>
            <div>
              <div className='mb-3 text-sm font-medium text-gray-700'>
                다양한 variant별 loading 상태
              </div>
              <div className='flex flex-wrap gap-3'>
                <Button loading>Default</Button>
                <Button variant='outline' loading>
                  Outline
                </Button>
                <Button variant='ghost' loading>
                  Ghost
                </Button>
                <Button variant='primary' loading>
                  Primary
                </Button>
              </div>
            </div>

            <div>
              <div className='mb-3 text-sm font-medium text-gray-700'>
                크기별 loading 상태
              </div>
              <div className='flex flex-wrap items-center gap-3'>
                <Button size='small' loading>
                  Small Loading
                </Button>
                <Button size='medium' loading>
                  Medium Loading
                </Button>
                <Button size='large' loading>
                  Large Loading
                </Button>
              </div>
            </div>

            <div>
              <div className='mb-3 text-sm font-medium text-gray-700'>
                Interactive Loading Demo
              </div>
              <div className='flex gap-3'>
                <Button
                  variant='primary'
                  onClick={handleLoadingDemo}
                  loading={isLoading}
                >
                  {isLoading ? '로딩 중...' : '3초 로딩 테스트'}
                </Button>
                <Button
                  variant='outline'
                  onClick={() => setIsLoading(!isLoading)}
                >
                  {isLoading ? '로딩 중지' : '로딩 시작'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Time Selection Example */}
        <div className='rounded-xl bg-white p-8 shadow-sm'>
          <h2 className='mb-6 text-2xl font-semibold text-gray-900'>
            실제 사용 예시
          </h2>
          <div className='max-w-md space-y-6'>
            <div>
              <div className='mb-3 text-sm font-medium text-gray-700'>
                예약 가능한 시간
              </div>
              <div className='grid grid-cols-2 gap-3'>
                <Button
                  selected={selectedTime === '14:00-15:00'}
                  onClick={() => handleTimeSelect('14:00-15:00')}
                >
                  14:00-15:00
                </Button>
                <Button
                  selected={selectedTime === '15:00-16:00'}
                  onClick={() => handleTimeSelect('15:00-16:00')}
                >
                  15:00-16:00
                </Button>
              </div>
            </div>

            <div className='border-t pt-4'>
              <div className='mb-3 text-sm text-gray-600'>총 합계 ₩ 10,000</div>
              <Button
                variant='primary'
                onClick={handleReservation}
                disabled={!selectedTime}
                loading={isLoading}
                className='w-full'
              >
                {isLoading ? '예약 처리 중...' : '예약하기'}
              </Button>
            </div>
          </div>
        </div>

        {/* AsChild & Combined */}
        <div className='grid gap-8 md:grid-cols-2'>
          {/* AsChild Example */}
          <div className='rounded-xl bg-white p-8 shadow-sm'>
            <h2 className='mb-6 text-2xl font-semibold text-gray-900'>
              AsChild with Link
            </h2>
            <div className='space-y-3'>
              <Button asChild className='w-full'>
                <Link href='/activities'>활동 보러가기</Link>
              </Button>
              <Button asChild variant='primary' className='w-full'>
                <Link href='/mypage'>마이페이지</Link>
              </Button>
            </div>
          </div>

          {/* Combined Properties */}
          <div className='rounded-xl bg-white p-8 shadow-sm'>
            <h2 className='mb-6 text-2xl font-semibold text-gray-900'>
              조합 예시
            </h2>
            <div className='space-y-3'>
              <Button variant='outline' size='small' selected>
                Outline Small Selected
              </Button>
              <Button variant='primary' size='large' disabled>
                Primary Large Disabled
              </Button>
              <Button
                variant='ghost'
                size='medium'
                onClick={() => alert('클릭됨!')}
              >
                Ghost Medium Clickable
              </Button>
            </div>
          </div>
        </div>

        {/* AsChild + Disabled Combinations */}
        <div className='rounded-xl bg-white p-8 shadow-sm'>
          <h2 className='mb-6 text-2xl font-semibold text-gray-900'>
            AsChild + Disabled 조합
          </h2>
          <div className='grid gap-6 md:grid-cols-2'>
            {/* Next.js Link Examples */}
            <div>
              <h3 className='mb-4 text-lg font-medium text-gray-800'>
                Next.js Link
              </h3>
              <div className='space-y-3'>
                <div>
                  <div className='mb-2 text-sm text-gray-600'>활성화 상태</div>
                  <Button asChild variant='primary' size='small'>
                    <Link href='/activities'>활성화된 링크</Link>
                  </Button>
                </div>

                <div>
                  <div className='mb-2 text-sm text-gray-600'>
                    비활성화 상태 (자동 처리)
                  </div>
                  <Button asChild variant='primary' size='small' disabled>
                    <Link href='/activities' aria-disabled='true'>
                      비활성화된 링크
                    </Link>
                  </Button>
                </div>

                <div>
                  <div className='mb-2 text-sm text-gray-600'>
                    조건부 렌더링 방식 (권장)
                  </div>
                  {false ? (
                    <Button asChild variant='primary' size='small'>
                      <Link href='/activities'>조건부 링크</Link>
                    </Button>
                  ) : (
                    <Button variant='primary' size='small' disabled>
                      조건부 링크
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Regular a tag Examples */}
            <div>
              <h3 className='mb-4 text-lg font-medium text-gray-800'>
                일반 a 태그
              </h3>
              <div className='space-y-3'>
                <div>
                  <div className='mb-2 text-sm text-gray-600'>활성화 상태</div>
                  <Button asChild variant='outline' size='small'>
                    <a
                      href='https://example.com'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      외부 링크
                    </a>
                  </Button>
                </div>

                <div>
                  <div className='mb-2 text-sm text-gray-600'>
                    비활성화 상태 (자동 처리)
                  </div>
                  <Button asChild variant='outline' size='small' disabled>
                    <a
                      href='https://example.com'
                      aria-disabled='true'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      비활성화된 외부 링크
                    </a>
                  </Button>
                </div>

                <div>
                  <div className='mb-2 text-sm text-gray-600'>
                    onClick 핸들러가 있는 경우
                  </div>
                  <Button asChild variant='ghost' size='small' disabled>
                    <a
                      href='https://example.com'
                      onClick={() => alert('클릭됨!')}
                      aria-disabled='true'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      onClick 핸들러 테스트
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className='mt-6 rounded-lg bg-blue-50 p-4'>
            <h4 className='mb-2 font-medium text-blue-900'>
              🎉 자동 disabled 처리 기능 (Radix UI 방식)
            </h4>
            <ul className='space-y-1 text-sm text-blue-800'>
              <li>
                • <code>disabled</code> 또는 <code>loading</code> prop만
                전달하면 자동으로 처리됩니다
              </li>
              <li>• 링크 이동과 onClick 핸들러 모두 자동으로 방지됩니다</li>
              <li>
                • <code>aria-disabled</code> 및 <code>aria-busy</code> 속성은
                사용자가 직접 추가해야 합니다
              </li>
              <li>
                • 수동으로 preventDefault나 조건부 처리를 할 필요가 없습니다
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
