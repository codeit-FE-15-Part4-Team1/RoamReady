import MyPageContentHeader from '@/domain/Reservation/components/header';
import MyActivitySection from '@/domain/Reservation/components/my-activity-section/MyActivitySection';

export default function MyExperiencePage() {
  return (
    <div>
      <div className='flex justify-between'>
        <MyPageContentHeader title='내 체험 관리' />
      </div>
      <MyActivitySection />
    </div>
  );
}
