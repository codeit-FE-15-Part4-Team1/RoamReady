import { Minus, Plus } from 'lucide-react';

interface ParticipationProps {
  count: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function HeadCount({
  count,
  onIncrease,
  onDecrease,
}: ParticipationProps) {
  return (
    <div className='flex h-40 w-140 items-center justify-around rounded-4xl border-1 border-gray-50 bg-white px-12 py-8'>
      <button
        type='button'
        aria-label='인원 수 감소'
        onClick={onDecrease}
        className='cursor-pointer'
      >
        <Minus
          className={`h-20 w-20 hover:text-gray-300 ${
            count === 1 ? 'cursor-not-allowed text-gray-300' : 'text-gray-950'
          }`}
        />
      </button>

      <span className='font-size-16 font-bold text-gray-950'>{count}</span>

      <button
        type='button'
        aria-label='인원 수 증가'
        onClick={onIncrease}
        className='cursor-pointer'
      >
        <Plus className='h-20 w-20 hover:text-gray-300' />
      </button>
    </div>
  );
}
