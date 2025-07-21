import HeadCount from './HeadCount';

interface ParticipantSelectProps {
  count: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

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

      <HeadCount
        count={count}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
      />
    </section>
  );
}
