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
          <div className='h-60 w-full' />
        </div>

        {/* 2. CategoryInput Skeleton */}
        <div className='flex flex-col gap-10'>
          <div className='bg-brand-1 h-30 w-80'></div>
          <div className='h-276 w-full'></div>
        </div>

        {/* 3. DescriptionInput Skeleton (textarea) */}
        <div className='flex flex-col gap-2'>
          <div className='h-30 w-40' />
          <div className='h-48 w-full' />
        </div>

        {/* 4. PriceInput Skeleton */}
        <div className='flex flex-col gap-2'>
          <div className='h-5 w-16' />
          <div className='h-12 w-full' />
        </div>

        {/* 5. LocationInput Skeleton */}
        <div className='flex flex-col gap-2'>
          <div className='h-5 w-16' />
          <div className='h-12 w-full' />
        </div>

        {/* 6. TimeSlotInput Skeleton (상세 코드 반영하여 수정) */}
        <div className='flex flex-col gap-4'>
          <div className='h-5 w-48' />
          {/* TimeSlotHeader Skeleton */}
          <div className='grid grid-cols-10 gap-x-10'>
            <div className='col-span-6'>
              <div className='h-4 w-12' /> {/* 날짜 라벨 */}
              <div className='mt-2 h-12 w-full' />
            </div>
            <div className='col-span-4 flex items-end gap-x-10'>
              <div className='flex-1'>
                <div className='h-4 w-20' /> {/* 시작 시간 라벨 */}
                <div className='mt-2 h-12 w-full' />
              </div>
              <div className='flex-1'>
                <div className='h-4 w-20' /> {/* 종료 시간 라벨 */}
                <div className='mt-2 h-12 w-full' />
              </div>
              <div className='h-[50px] w-[50px] rounded-full' />{' '}
              {/* 추가 버튼 */}
            </div>
          </div>
          <div className='h-px w-full' />
          {/* TimeSlotRow Skeleton (2개 예시) */}
          {[1, 2].map((i) => (
            <div key={i} className='grid grid-cols-10 gap-x-10'>
              <div className='col-span-6'>
                <div className='h-12 w-full' />
              </div>
              <div className='col-span-4 flex items-center gap-x-10'>
                <div className='h-12 flex-1' />
                <div className='text-gray-200'>-</div>
                <div className='h-12 flex-1' />
                <div className='h-[50px] w-[50px] rounded-full' />{' '}
                {/* 삭제 버튼 */}
              </div>
            </div>
          ))}
        </div>

        {/* 7. BannerImageInput Skeleton (상세 코드 반영하여 수정) */}
        <div className='flex flex-col gap-3'>
          <div className='h-5 w-36' /> {/* 배너 이미지 등록 라벨 */}
          <div className='flex items-center gap-20'>
            {/* 이미지 추가 버튼 */}
            <div className='h-[112px] w-[112px] rounded-lg' />
            {/* 미리보기 이미지 예시 */}
            <div className='h-[112px] w-[112px] rounded-lg' />
          </div>
        </div>

        {/* 8. IntroImageInput Skeleton (상세 코드 반영하여 수정) */}
        <div className='flex flex-col gap-3'>
          <div className='h-5 w-40' /> {/* 소개 이미지 등록 라벨 */}
          <div className='flex flex-wrap items-center gap-20'>
            {/* 이미지 추가 버튼 */}
            <div className='h-[112px] w-[112px] rounded-lg' />
            {/* 미리보기 이미지 예시 (2개) */}
            <div className='h-[112px] w-[112px] rounded-lg' />
            <div className='h-[112px] w-[112px] rounded-lg' />
          </div>
        </div>

        {/* 9. SubmitButton Skeleton */}
        <div className='mt-4 h-14 w-full' />
      </div>
    </div>
  );
}
