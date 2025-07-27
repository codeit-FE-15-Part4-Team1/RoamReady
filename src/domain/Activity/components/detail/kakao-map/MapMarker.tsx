interface MapMarkerProps {
  address: string;
}

/**
 * 커스텀 오버레이 컴포넌트입니다.
 * 지도 위에 말풍선 형태로 주소 정보를 시각적으로 표현합니다.
 *
 * - 둥근 말풍선 스타일로 구성되어 있으며, 위치 아이콘과 함께 주소가 출력됩니다.
 * - 말풍선 아래에는 화살표 꼬리 형태의 삼각형이 포함되어 있습니다.
 *
 * @component
 * @example
 * <CustomOverlay address="서울특별시 강남구" />
 *
 * @param {MapMarkerProps} props - 컴포넌트에 전달되는 props
 */
export default function MapMarker({ address }: MapMarkerProps) {
  return (
    <div className='relative'>
      {/* 말풍선 본체 */}
      <div className='border-brand-2 absolute bottom-full left-1/2 inline-flex -translate-x-1/2 items-center rounded-full border-2 bg-white px-8 py-4 text-xl font-bold text-gray-800 shadow-xl'>
        {/* 위치 아이콘 원형 영역 */}
        <div className='bg-brand-2 mr-4 flex h-20 w-20 items-center justify-center rounded-full'>
          <svg
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='white'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M12 2C7.589 2 4 5.589 4 9.995C3.971 16.44 11.696 21.784 12 22C12 22 20.029 16.44 20 10C20 5.589 16.411 2 12 2ZM12 14C9.79 14 8 12.21 8 10C8 7.79 9.79 6 12 6C14.21 6 16 7.79 16 10C16 12.21 14.21 14 12 14Z' />
          </svg>
        </div>
        {address}
      </div>

      {/* 꼬리 부분: 삼각형 */}
      <div className='absolute top-full left-1/2 h-0 w-0 -translate-x-1/2 border-t-[16px] border-r-[12px] border-l-[12px] border-t-[#2D8CFF]'>
        <div className='absolute -top-[19px] -left-[11px] h-0 w-0 border-t-[16px] border-r-[12px] border-l-[12px] border-t-white' />
      </div>
    </div>
  );
}
