import KaKaoMap from '@/domain/Activity/components/detail/kakao-map/KaKaoMap';

export default function KaKaoMapTestPage() {
  return (
    <div className='mx-auto w-320'>
      <KaKaoMap address='서울특별시 중구 세종대로 110' />
    </div>
  );
}
