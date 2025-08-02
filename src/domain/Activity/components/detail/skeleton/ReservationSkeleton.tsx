export default function ReservationSkeleton() {
  return (
    <div className='brand-3 border-brand-1 h-fit w-400 animate-pulse rounded-4xl border-1 p-30'>
      <div className='flex flex-col gap-24'>
        {/* 가격 정보 */}
        <div className='flex items-center gap-8'>
          <div className='flex gap-3'>
            <div className='bg-brand-1 h-30 w-30 rounded-full' />
            <div className='bg-brand-1 h-30 w-80 rounded-xl' />
          </div>
          <div className='bg-brand-1 h-20 w-20 rounded-xl' />
        </div>

        {/* 날짜 선택 */}
        <div className='flex w-full flex-col gap-8'>
          <div className='bg-brand-1 h-20 w-30 rounded-xl' />
          {/* DatePicker  */}
          <div className='flex flex-col gap-8'>
            {/* DatePicker Header */}
            <div className='flex justify-between'>
              {/* 월 */}
              <div className='bg-brand-1 h-20 w-80 rounded-xl' />

              {/* 버튼 */}
              <div className='flex gap-3'>
                <div className='bg-brand-1 h-20 w-20 rounded-full' />
                <div className='bg-brand-1 h-20 w-20 rounded-full' />
              </div>
            </div>

            {/* 달력 */}
            <div className='bg-brand-1 h-350 w-full rounded-2xl'></div>
          </div>
        </div>

        {/* 참여 인원 수 선택 */}
        <div className='flex items-center justify-between'>
          <div className='bg-brand-1 h-20 w-80 rounded-xl' />

          {/* Headcount */}
          <div className='border-brand-1 flex h-40 w-140 items-center justify-around rounded-4xl border-2 px-12 py-8'>
            <div className='bg-brand-1 h-20 w-20 rounded-full' />
            <div className='bg-brand-1 h-20 w-30 rounded-full' />
            <div className='bg-brand-1 h-20 w-20 rounded-full' />
          </div>
        </div>

        {/* 예약 가능한 시간 */}
        <div className='flex flex-col gap-14'>
          <div className='bg-brand-1 h-20 w-100 rounded-xl' />
          {/* 시간대 */}
          <div className='flex flex-col gap-10'>
            <div className='bg-brand-1 h-50 w-full rounded-xl' />
            <div className='bg-brand-1 h-50 w-full rounded-xl' />
          </div>
        </div>

        {/* 총 합계 및 예약 버튼 */}
        <div className='border-brand-1 flex items-center justify-between border-t-3 pt-24'>
          <div className='flex items-center gap-8'>
            <div className='bg-brand-1 h-25 w-50 rounded-xl' />
            <div className='bg-brand-1 h-25 w-90 rounded-xl' />
          </div>

          <div className='bg-brand-1 h-50 w-135 rounded-2xl' />
        </div>
      </div>
    </div>
  );
}
