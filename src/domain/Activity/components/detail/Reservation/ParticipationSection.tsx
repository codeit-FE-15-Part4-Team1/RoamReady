import HeadCount from './HeadCount';

interface ParticipantSelectProps {
  count: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

/**
 * ParticipantSelect
 * 참여 인원 수를 설정하는 컴포넌트로, 제목과 인원 수 조절(HeadCount) UI를 포함합니다.
 *
 * @param count - 현재 선택된 인원 수
 * @param onIncrease - 인원 수 증가 버튼 클릭 시 호출되는 콜백 함수
 * @param onDecrease - 인원 수 감소 버튼 클릭 시 호출되는 콜백 함수
 * @returns 참여 인원 수 제목과 HeadCount 컴포넌트를 포함한 section 요소
 *
 * @example
 * <ParticipantSelect
 *   count={2}
 *   onIncrease={() => setCount((prev) => prev + 1)}
 *   onDecrease={() => setCount((prev) => prev - 1)}
 * />
 */
export default function ParticipantSelect({
  count,
  onIncrease,
  onDecrease,
}: ParticipantSelectProps) {
  return (
    <section
      aria-labelledby='participation'
      className='flex items-center justify-between'
    >
      <h3 id='participation' className='font-size-16 font-bold'>
        참여 인원 수
      </h3>

      {/* 인원 조절 버튼(+, -) 및 인원 수 표시 */}
      <HeadCount
        count={count}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
      />
    </section>
  );
}
