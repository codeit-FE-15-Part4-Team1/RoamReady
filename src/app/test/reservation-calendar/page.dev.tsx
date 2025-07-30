'use client';

export default function CalendarTestPage() {
  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className='mx-auto max-w-7xl'>
        <div className='mb-8'>
          <h1 className='mb-4 text-3xl font-bold text-gray-900'>
            🗓️ ReservationCalendar 테스트 페이지
          </h1>
          <p className='text-gray-600'>
            예약 캘린더 컴포넌트의 다양한 기능을 테스트해볼 수 있습니다.
          </p>
        </div>

        {/* 기본 캘린더 */}
        <div className='mb-8 rounded-lg bg-white p-6 shadow-md'>
          <h2 className='mb-4 text-xl font-semibold text-gray-800'>
            📅 기본 캘린더
          </h2>
          <div className='flex justify-center'>
            {/* <ReservationCalendar /> */}
          </div>
        </div>

        {/* 기능 설명 */}
        <div className='mb-8 rounded-lg bg-white p-6 shadow-md'>
          <h2 className='mb-4 text-xl font-semibold text-gray-800'>
            ✨ 주요 기능
          </h2>
          <div className='grid gap-6 md:grid-cols-3'>
            <div>
              <h3 className='mb-2 font-semibold text-gray-700'>
                📍 네비게이션
              </h3>
              <ul className='space-y-1 text-sm text-gray-600'>
                <li>• 좌/우 화살표로 월 이동</li>
                <li>• 현재 월 하이라이트 표시</li>
                <li>• 오늘 날짜 파란색 배경</li>
              </ul>
            </div>
            <div>
              <h3 className='mb-2 font-semibold text-gray-700'>
                🎯 이벤트 표시
              </h3>
              <ul className='space-y-1 text-sm text-gray-600'>
                <li>• 빨간 점으로 이벤트 있음 표시</li>
                <li>• 최대 2개 이벤트 미리보기</li>
                <li>• 추가 이벤트 개수 표시</li>
              </ul>
            </div>
            <div>
              <h3 className='mb-2 font-semibold text-gray-700'>
                ⚡ 우선순위 정렬
              </h3>
              <ul className='space-y-1 text-sm text-gray-600'>
                <li>• 완료 → 승인 → 예약 → 거절 → 취소 순</li>
                <li>• 같은 날짜 여러 이벤트 자동 정렬</li>
                <li>• 중요도 높은 이벤트 우선 표시</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 색상 가이드 */}
        <div className='rounded-lg bg-white p-6 shadow-md'>
          <h2 className='mb-4 text-xl font-semibold text-gray-800'>
            🎨 이벤트 색상 가이드
          </h2>
          <div className='grid grid-cols-2 gap-4 md:grid-cols-5'>
            <div className='flex items-center space-x-2'>
              <div className='h-4 w-4 rounded bg-green-200'></div>
              <span className='text-sm font-medium text-green-400'>
                완료 (우선순위 1)
              </span>
            </div>
            <div className='flex items-center space-x-2'>
              <div className='h-4 w-4 rounded bg-blue-200'></div>
              <span className='text-sm font-medium text-blue-400'>
                승인 (우선순위 2)
              </span>
            </div>
            <div className='flex items-center space-x-2'>
              <div className='h-4 w-4 rounded bg-purple-200'></div>
              <span className='text-sm font-medium text-purple-400'>
                예약 (우선순위 3)
              </span>
            </div>
            <div className='flex items-center space-x-2'>
              <div className='h-4 w-4 rounded bg-orange-200'></div>
              <span className='text-sm font-medium text-orange-400'>
                거절 (우선순위 4)
              </span>
            </div>
            <div className='flex items-center space-x-2'>
              <div className='h-4 w-4 rounded bg-red-200'></div>
              <span className='text-sm font-medium text-red-400'>
                취소 (우선순위 5)
              </span>
            </div>
          </div>
        </div>

        {/* 테스트 데이터 정보 */}
        <div className='mt-8 rounded-lg bg-blue-50 p-4'>
          <h3 className='mb-2 font-semibold text-blue-800'>
            📋 테스트 데이터 정보
          </h3>
          <p className='text-sm text-blue-600'>
            현재 2025년 7월 14일~18일에 샘플 이벤트들이 설정되어 있습니다. 해당
            날짜로 이동해서 이벤트 표시 및 우선순위 정렬 기능을 확인해보세요!
          </p>
          <div className='mt-2 text-xs text-blue-500'>
            💡 팁: 7월 15일, 16일, 17일에는 여러 이벤트가 있어서 우선순위 정렬을
            확인할 수 있습니다.
          </div>
        </div>
      </div>
    </div>
  );
}
