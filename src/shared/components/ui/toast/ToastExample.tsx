import Button from '@/shared/components/Button'; // 프로젝트의 Button 컴포넌트 경로
import useToast from '@/shared/hooks/useToast';

/**
 * @description 토스트 UI를 종류별로 테스트하기 위한 예제 컴포넌트입니다.
 */
export default function ToastExample() {
  const { showSuccess, showError, showInfo, showWarning } = useToast();

  return (
    <div className='flex flex-wrap items-center justify-center gap-4 rounded-lg bg-white p-8 shadow-md'>
      <h1 className='w-full text-center text-xl font-bold text-gray-800'>
        🍞 Toast UI Test
      </h1>

      <Button
        variant='primary'
        onClick={() => showSuccess('성공적으로 저장되었습니다!')}
      >
        Success 토스트
      </Button>

      <Button
        variant='primary'
        onClick={() => showError('오류가 발생했습니다. 다시 시도해주세요.')}
      >
        Error 토스트
      </Button>

      <Button
        variant='primary'
        onClick={() => showInfo('이것은 단순 정보입니다.')}
      >
        Info 토스트
      </Button>

      <Button
        variant='primary'
        onClick={() => showWarning('입력값을 다시 확인해주세요.')}
      >
        Warning 토스트
      </Button>
    </div>
  );
}
