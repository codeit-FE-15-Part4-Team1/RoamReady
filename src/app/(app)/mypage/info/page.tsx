import EditableAvatar from '@/domain/User/components/ui/EditableAvatar';

export default function MyInfoPage() {
  return (
    <div>
      <EditableAvatar
        initialImageUrl=''
        className='tablet:py-16 desktop:py-24 mx-auto py-24'
      />
    </div>
  );
}
