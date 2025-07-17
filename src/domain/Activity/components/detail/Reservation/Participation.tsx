import { Minus, Plus } from 'lucide-react';

export default function Participation() {
  return (
    <div className='flex h-40 w-140 items-center justify-around rounded-4xl border-1 border-gray-50 bg-white px-12 py-8'>
      <button
        type='button'
        aria-label='인원 수 감소'
        className='cursor-pointer'
      >
        <Minus className='h-20 w-20 hover:text-gray-300' />
      </button>

      <span className='font-size-16 test-gray-950 font-bold'>10</span>

      <button
        type='button'
        aria-label='인원 수 증가'
        className='cursor-pointer'
      >
        <Plus className='h-20 w-20 hover:text-gray-300' />
      </button>
    </div>
  );
}
