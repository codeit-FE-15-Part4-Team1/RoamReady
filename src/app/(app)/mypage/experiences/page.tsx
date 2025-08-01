export default function MyExperiencePage() {
  return (
    <div>
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <h1 className='text-lg font-bold text-gray-900'>내 체험 관리</h1>
          <p className='text-sm text-gray-600'>
            게시한 등록하신 수 있는 체험을 관리합니다.
          </p>
        </div>
        <button className='rounded-lg bg-blue-500 px-4 py-2 text-sm text-white'>
          체험 등록하기
        </button>
      </div>
      <div className='py-12 text-center text-gray-500'>
        등록된 체험이 없습니다.
      </div>
    </div>
  );
}
