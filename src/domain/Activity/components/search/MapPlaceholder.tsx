/**
 * 지도 플레이스홀더 컴포넌트
 */
export default function MapPlaceholder() {
  return (
    <div className='flex h-full w-full items-center justify-center rounded-3xl bg-gray-100 text-lg text-gray-400'>
      <div className='text-center'>
        <div className='mb-2 text-xl'>🗺️</div>
        <div className='font-medium'>지도 영역</div>
        <div className='text-sm text-gray-300'>(추후 구현)</div>
      </div>
    </div>
  );
}
