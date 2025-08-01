export default function ReviewSkeleton() {
  return (
    <div className='flex-col-center w-full animate-pulse gap-30'>
      <div className='flex w-full flex-col gap-15'>
        {/* 헤더: "체험 후기" 제목 + 총 개수 */}
        <div className='flex items-center gap-5'>
          <div className='bg-brand-1 h-25 w-80 rounded-xl' />
          <div className='bg-brand-1 h-15 w-30 rounded-xl' />
        </div>

        {/* 평균 평점 시각화: 숫자 + 이모지 + 메시지 */}
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col items-center justify-center gap-3'>
            {/* 평균 평점 */}
            <div className='bg-brand-1 h-40 w-60 rounded-xl' />
            <div className='flex items-center gap-3'>
              {/* 평점 아이콘 (얼굴) */}
              <div className='bg-brand-1 h-25 w-25 rounded-full' />
              <div className='bg-brand-1 h-20 w-50 rounded-xl' />
            </div>
          </div>

          {/* 별 아이콘과 총 후기 개수 표시 */}
          <div className='flex items-center justify-center gap-2'>
            <div className='bg-brand-1 h-15 w-15 rounded-full' />
            <div className='bg-brand-1 h-15 w-50 rounded-xl' />
          </div>
        </div>

        {/* 리뷰 카드 목록 */}
        <div className='flex w-full flex-col gap-20'>
          <div className='bg-brand-1 h-90 w-full rounded-xl' />
          <div className='bg-brand-1 h-90 w-full rounded-xl' />
          <div className='bg-brand-1 h-90 w-full rounded-xl' />
          <div className='bg-brand-1 h-90 w-full rounded-xl' />
        </div>
      </div>

      <div className='flex gap-5'>
        <div className='bg-brand-1 h-40 w-40 rounded-xl' />
        <div className='bg-brand-1 h-40 w-40 rounded-xl' />
        <div className='bg-brand-1 h-40 w-40 rounded-xl' />
        <div className='bg-brand-1 h-40 w-40 rounded-xl' />
        <div className='bg-brand-1 h-40 w-40 rounded-xl' />
      </div>
    </div>
  );
}
