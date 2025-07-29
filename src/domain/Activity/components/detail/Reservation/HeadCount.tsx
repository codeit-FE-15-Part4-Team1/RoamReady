import { Minus, Plus } from 'lucide-react';
import { KeyboardEvent } from 'react';

interface ParticipationProps {
  count: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

/**
 * HeadCount
 * 체험 예약 시 참여 인원 수를 조절할 수 있는 카운터 컴포넌트
 *
 * @param count - 현재 선택된 인원 수
 * @param onIncrease - 인원 수 증가 버튼 클릭 시 호출되는 콜백 함수
 * @param onDecrease - 인원 수 감소 버튼 클릭 시 호출되는 콜백 함수
 * @returns 인원 수 조절 UI(플러스/마이너스 버튼 및 현재 인원 표시)를 포함한 div 요소
 *
 * @example
 * <HeadCount
 *   count={2}
 *   onIncrease={() => setCount((prev) => Math.min(prev + 1, 10))}
 *   onDecrease={() => setCount((prev) => Math.max(prev - 1, 1))}
 * />
 */
export default function HeadCount({
  count,
  onIncrease,
  onDecrease,
}: ParticipationProps) {
  // 상하 버튼 클릭시 인원수 증가/감소 핸들러
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault(); // 페이지 스크롤 방지
      onIncrease();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault(); // 페이지 스크롤 방지
      onDecrease();
    }
  };

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label='인원 수 조절'
      role='spinbutton'
      aria-valuenow={count}
      aria-valuemin={1}
      className='flex h-40 w-140 items-center justify-around rounded-4xl border-1 border-gray-50 bg-white px-12 py-8'
    >
      <button
        type='button'
        aria-label='인원 수 감소'
        onClick={onDecrease}
        className='cursor-pointer'
      >
        <Minus
          className={`h-20 w-20 hover:text-gray-300 ${
            // 인원 수 1명일 경우 비활성화 처리
            count === 1 ? 'cursor-not-allowed text-gray-300' : 'text-gray-950'
          }`}
        />
      </button>

      {/* 현재 인원 수 표시 */}
      <span className='font-size-16 font-bold text-gray-950'>{count}</span>

      <button
        type='button'
        aria-label='인원 수 증가'
        onClick={onIncrease}
        className='cursor-pointer'
      >
        <Plus className={`h-20 w-20 hover:text-gray-300`} />
      </button>
    </div>
  );
}
