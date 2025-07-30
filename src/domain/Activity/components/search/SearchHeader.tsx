interface SearchHeaderProps {
  totalCount: number;
}

/**
 * 검색 결과 헤더
 */
export default function SearchHeader({ totalCount }: SearchHeaderProps) {
  return (
    <div className='mb-8 flex items-center gap-14'>
      <h1 className='font-size-24 font-bold text-neutral-800'>검색 결과</h1>
      <p className='font-size-16 text-neutral-400'>총 {totalCount}건</p>
    </div>
  );
}
