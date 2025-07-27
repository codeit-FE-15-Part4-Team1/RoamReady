import LogoSymbol from '@/shared/assets/logos/LogoSymbol';

export default function DeleteModalContent() {
  return (
    <div className='flex flex-col items-center justify-between gap-10'>
      <LogoSymbol className='text-red h-90 w-90' />
      <h4 className='font-size-18 tablet:font-size- font-bold text-gray-900'>
        정말 체험을 삭제하시겠습니까?
      </h4>
      <p className='font-size-14 text-gray-600'>
        이 작업은 되돌릴 수 없습니다.
      </p>
    </div>
  );
}
