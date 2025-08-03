// CreateActivityFormSkeleton.tsx (최종 수정본)

/**
 * 개별 스켈레톤 UI 요소에 대한 기본 스타일을 정의하는 헬퍼 컴포넌트입니다.
 */
/**
 * 체험 등록/수정 폼의 로딩 상태를 표시하는 스켈레톤 컴포넌트입니다.
 */
export default function CreateActivityFormSkeleton() {
  return (
    <div className='w-1200'>
      <div className='bg-brand-1 mb-20 w-140 py-15 font-bold'></div>
      <div className='bg-brand-1'></div>
      <div className='flex flex-col gap-[2.4rem]'>
        {/* 1. TitleInput Skeleton */}
        <div className='flex flex-col gap-10'>
          <div className='bg-brand-1 h-30 w-40'></div>
          <div className='bg-brand-1 w-full' style={{ height: '60px' }} />
        </div>

        {/* 1. TitleInput Skeleton */}
        <div className='flex flex-col gap-10'>
          <div className='bg-brand-1 h-30 w-80'></div>
          <div className='bg-brand-1 w-full' style={{ height: '60px' }} />
        </div>

        {/* 2. CategoryInput Skeleton */}
        <div className='flex flex-col gap-10'>
          <div className='bg-brand-1 h-30 w-40'></div>
          <div className='bg-brand-1 w-full' style={{ height: '276px' }}></div>
        </div>

        {/* 1. TitleInput Skeleton */}
        <div className='flex flex-col gap-10'>
          <div className='bg-brand-1 h-30 w-40'></div>
          <div className='bg-brand-1 w-full' style={{ height: '60px' }} />
        </div>

        {/* 1. TitleInput Skeleton */}
        <div className='flex flex-col gap-10'>
          <div className='bg-brand-1 h-30 w-40'></div>
          <div className='bg-brand-1 w-full' style={{ height: '60px' }} />
        </div>

        <div className='flex flex-col gap-10'>
          <div className='bg-brand-1 h-30 w-150'></div>
          <div className='flex gap-10'>
            <div style={{ width: '60%' }}>
              <div className='flex w-full flex-col gap-10'>
                <div className='bg-brand-1 h-15 w-40'></div>
                <div
                  className='bg-brand-1 w-full'
                  style={{ height: '60px', width: '100%' }}
                />
              </div>
            </div>
            <div style={{ width: '15%' }}>
              <div className='flex w-full flex-col gap-10'>
                <div className='bg-brand-1 h-15 w-40'></div>
                <div
                  className='bg-brand-1 w-full'
                  style={{ height: '60px', width: '100%' }}
                />
              </div>
            </div>
            <div className='pt-50'>
              <div className='bg-brand-1 h-10 w-20' />
            </div>
            <div style={{ width: '15%' }}>
              <div className='flex w-full flex-col gap-10'>
                <div className='bg-brand-1 h-15 w-40'></div>
                <div
                  className='bg-brand-1 w-full'
                  style={{ height: '60px', width: '100%' }}
                />
              </div>
            </div>
            <div className='pt-30'>
              <div className='bg-brand-1 size-50 rounded-full' />
            </div>
          </div>
        </div>

        {/* 7. BannerImageInput Skeleton (상세 코드 반영하여 수정) */}
        <div className='flex flex-col gap-3'>
          <div className='bg-brand-1 h-5 w-36' /> {/* 배너 이미지 등록 라벨 */}
          <div className='flex items-center gap-20'>
            {/* 이미지 추가 버튼 */}
            <div
              className='bg-brand-1 w-[112px] rounded-lg'
              style={{ height: '112px' }}
            />
            {/* 미리보기 이미지 예시 */}
            <div
              className='bg-brand-1 w-[112px] rounded-lg'
              style={{ height: '112px' }}
            />
          </div>
        </div>

        {/* 8. IntroImageInput Skeleton (상세 코드 반영하여 수정) */}
        <div className='flex flex-col gap-3'>
          <div className='bg-brand-1 h-5 w-40' /> {/* 소개 이미지 등록 라벨 */}
          <div className='flex flex-wrap items-center gap-20'>
            {/* 이미지 추가 버튼 */}
            <div
              className='bg-brand-1 w-[112px] rounded-lg'
              style={{ height: '112px' }}
            />
            {/* 미리보기 이미지 예시 (2개) */}
            <div
              className='bg-brand-1 w-[112px] rounded-lg'
              style={{ height: '112px' }}
            />
            <div
              className='bg-brand-1 w-[112px] rounded-lg'
              style={{ height: '112px' }}
            />
          </div>
        </div>

        {/* 9. SubmitButton Skeleton */}
        <div className='flex w-full justify-center'>
          <div className='bg-brand-1 mt-4 h-40 w-120 rounded-2xl' />
        </div>
      </div>
    </div>
  );
}
