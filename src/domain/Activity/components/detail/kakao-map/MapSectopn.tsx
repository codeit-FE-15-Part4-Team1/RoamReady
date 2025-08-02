import KaKaoMap from '@/domain/Activity/components/detail/kakao-map/KaKaoMap';

export default function MapSection({ address }: { address: string }) {
  return (
    <section className='flex w-full flex-col justify-center gap-8 border-b border-gray-100 pb-40'>
      <h2 className='font-size-18 font-bold'>오시는 길</h2>
      <KaKaoMap address={address} className='tablet:h-450 h-250' />
    </section>
  );
}
