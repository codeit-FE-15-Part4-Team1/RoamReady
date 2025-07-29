import { Search } from 'lucide-react';

export default function ActivitySearchButton() {
  return (
    <div className='absolute top-1/2 right-10 -translate-y-1/2'>
      <button
        type='submit'
        className='bg-brand-2 hover:bg-brand-2/80 flex cursor-pointer items-center justify-center gap-6 rounded-full px-16 py-12 text-white transition'
      >
        <Search className='size-18' />
        <span className='font-size-16 font-bold'>검색</span>
      </button>
    </div>
  );
}
