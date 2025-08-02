interface AuthFormSkeletonProps {
  isSignUp?: boolean; // 회원가입 페이지인지 여부를 결정하는 prop
}

/**
 * @component AuthFormSkeleton
 * @description
 * 로그인 및 회원가입 페이지의 로딩 상태를 표시하는 스켈레톤 UI 컴포넌트입니다.
 * isSignUp prop을 통해 회원가입 페이지에 맞는 추가 입력 필드를 렌더링합니다.
 */
export default function AuthFormSkeleton({
  isSignUp = false,
}: AuthFormSkeletonProps) {
  return (
    <div className='font-size-16 flex-col-center flex w-full max-w-640 animate-pulse gap-30'>
      <div className='flex-col-center gap-23'>
        <div className='bg-brand-1 size-144 rounded-full' />
        <div className='bg-brand-1 aspect-[255/31] w-255 rounded-md' />
      </div>

      {/* 폼 스켈레톤 */}
      <div className='flex w-full flex-col gap-20'>
        {/* 공통 인풋 스켈레톤들 */}
        <div className='flex flex-col gap-10'>
          <div className='bg-brand-1 h-24 w-100 rounded-2xl' />
          <div className='bg-brand-1 h-61 w-full rounded-2xl px-20' />
        </div>

        <div className='flex flex-col gap-10'>
          <div className='bg-brand-1 h-24 w-100 rounded-2xl' />
          <div className='bg-brand-1 relative h-61 w-full rounded-2xl px-20'>
            {!isSignUp && (
              <div className='bg-brand-2/10 absolute top-1/2 right-0 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-2xl' />
            )}
          </div>
        </div>

        {isSignUp && (
          <>
            <div className='flex flex-col gap-10'>
              <div className='bg-brand-1 h-24 w-100 rounded-2xl' />
              <div className='bg-brand-1 relative h-61 w-full rounded-2xl px-20'>
                <div className='bg-brand-2/10 absolute top-1/2 right-0 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-2xl' />
              </div>
            </div>
            <div className='flex flex-col gap-10'>
              <div className='bg-brand-1 h-24 w-100 rounded-2xl' />
              <div className='bg-brand-1 relative h-61 w-full rounded-2xl px-20'>
                <div className='bg-brand-2/10 absolute top-1/2 right-0 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-2xl' />
              </div>
            </div>
          </>
        )}

        {/* 버튼 스켈레톤 */}
        <div className='bg-brand-1 mt-10 h-61 w-full rounded-2xl' />
      </div>

      {/* 'or' 스켈레톤 */}
      <div className='relative flex w-full items-center'>
        <div className='border-brand-1 d w-full border-t' />
        <span className='text-brand-1 absolute left-1/2 -translate-x-1/2 bg-white px-7.5'>
          or
        </span>
      </div>
      {/* OAuth 스켈레톤 (카카오 버튼) */}
      <div className='w-full'>
        <div className='bg-brand-1 h-61 w-full rounded-2xl' />
      </div>
      {/* 링크 스켈레톤 */}
      <div className='bg-brand-1 flex h-24 justify-center gap-4'>
        <div className='bg-brand-1 w-153 rounded-2xl' />
        <div className='bg-brand-1 w-55 rounded-2xl' />
      </div>
    </div>
  );
}
