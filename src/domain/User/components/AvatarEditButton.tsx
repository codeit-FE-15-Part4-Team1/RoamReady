'use client';

import { PencilLine } from 'lucide-react';
import { ChangeEvent } from 'react';

import { cn } from '@/shared/libs/cn';

/**
 * AvatarEditButton 컴포넌트의 props
 */
interface AvatarEditButtonProps {
  /**
   * 파일 input의 값이 변경될 때 호출되는 이벤트 핸들러입니다.
   * 부모 컴포넌트에서 파일 처리 로직을 실행하는 데 사용됩니다.
   */
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  /**
   * 로딩 상태 여부를 나타냅니다.
   * true일 경우, 버튼이 비활성화되고 스피너가 표시됩니다.
   */
  isLoading: boolean;
}

/**
 * 프로필 아바타 위에 표시되는 원형 수정 버튼 컴포넌트입니다.
 * 클릭 시 파일 선택 다이얼로그를 열고, 로딩 상태에 따라 스피너 또는 연필 아이콘을 표시합니다.
 * @param onFileChange - 파일이 선택되었을 때 실행될 콜백 함수
 * @param isLoading - 로딩 상태 여부
 *
 * @example
 * <AvatarEditButton onFileChange={handleFileChange} isLoading={isUploading} />
 */
export default function AvatarEditButton({
  onFileChange,
  isLoading,
}: AvatarEditButtonProps) {
  // --- 렌더링 ---

  return (
    // 접근성을 위해 input과 연결된 label 요소를 사용합니다.
    // 클릭 가능한 전체 영역을 제공합니다.
    <label
      className={cn(
        'flex-center size-30 cursor-pointer rounded-full bg-gray-300 text-white shadow-md transition-colors',
        // 로딩 중일 때는 비활성화된 스타일을, 아닐 때는 호버 효과를 적용합니다.
        isLoading ? 'cursor-not-allowed bg-gray-300' : 'hover:bg-gray-500',
      )}
    >
      {isLoading ? (
        // 로딩스피너 UI
        <div className='border-t-brand-2 border-r-brand-2 size-16 animate-spin rounded-full border-2 border-white/50' />
      ) : (
        // 기본 상태일 때 표시되는 연필 아이콘
        <PencilLine className='size-16 text-white' />
      )}

      {/* 실제 파일 입력을 담당하지만, UI상으로는 보이지 않는 input 요소입니다. */}
      <input
        type='file'
        accept='image/*'
        onChange={onFileChange}
        // 기본 파일 인풋 UI를 시각적으로 숨깁니다.
        className='hidden'
        disabled={isLoading}
        // input을 클릭할 때마다 값을 초기화합니다.
        // 이를 통해 사용자가 이전에 선택했던 것과 '동일한 파일'을 다시 선택해도 onChange 이벤트가 정상적으로 발생합니다.
        onClick={(e) => {
          (e.target as HTMLInputElement).value = '';
        }}
      />
    </label>
  );
}
