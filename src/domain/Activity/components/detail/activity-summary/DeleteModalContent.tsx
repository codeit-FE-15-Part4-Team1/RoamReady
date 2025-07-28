import LogoSymbol from '@/shared/assets/logos/LogoSymbol';

/**
 * 삭제 확인 모달의 콘텐츠 컴포넌트입니다.
 *
 * - 삭제 전 사용자에게 경고 메시지를 보여줍니다.
 * - 삭제 작업이 되돌릴 수 없다는 점을 강조합니다.
 * - 로고와 함께 메시지를 시각적으로 전달합니다.
 *
 * @component
 */
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
