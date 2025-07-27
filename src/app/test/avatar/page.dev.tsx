import EditableAvatar from '@/domain/User/components/ui/EditableAvatar';
import Avatar from '@/shared/components/ui/avatar';

/**
 * Avatar 및 EditableAvatar 컴포넌트의 다양한 상태를 테스트하기 위한 페이지입니다.
 */
export default function AvatarTestPage() {
  return (
    <main className='flex min-h-screen flex-col gap-60 p-24'>
      <section className='flex flex-col gap-8'>
        <h2 className='font-size-24 font-semibold'>1. {'<Avatar>'}</h2>
        <div className='flex items-center gap-4'>
          <p className='font-size-18'>sm 사이즈:</p>
          <Avatar profileImageUrl='' />
          <Avatar profileImageUrl='/images/kakao-btn-lg.svg' />
        </div>
        <div className='flex items-center gap-4'>
          <p className='font-size-18'>lg 사이즈:</p>
          <Avatar profileImageUrl='' size='lg' />
          <Avatar profileImageUrl='/images/kakao-btn-lg.svg' size='lg' />
        </div>
      </section>

      <div className='h-1.5 w-full rounded-full bg-gray-200' />

      <section className='flex flex-col gap-8'>
        <h2 className='font-size-24 font-semibold'>2. {'<EditableAvatar>'}</h2>
        <div className='flex items-center gap-4'>
          <EditableAvatar initialImageUrl='' />
          <EditableAvatar initialImageUrl='/images/kakao-btn-lg.svg' />
        </div>
      </section>
    </main>
  );
}
