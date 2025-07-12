'use client';

import { Dialog, useDialogActions } from '@/shared/components/ui/Dialog';

// Dialog 내부에서 사용할 버튼 컴포넌트들
function CompleteDialogContent() {
  const { close } = useDialogActions();

  return (
    <div className='text-center'>
      <p className='text-[18px] font-bold text-gray-900 md:text-[20px]'>
        완료되었습니다!
      </p>
      <Dialog.Footer variant='complete'>
        <button
          className='bg-brand-2 hover:bg-brand-2/90 w-[130px] rounded-[8px] px-[16px] py-[12px] text-[14px] font-medium text-white transition-colors md:w-[160px] md:text-[16px]'
          onClick={close}
        >
          확인
        </button>
      </Dialog.Footer>
    </div>
  );
}

function CancelDialogContent() {
  const { close } = useDialogActions();

  return (
    <div className='text-center'>
      <div className='bg-red mx-auto mb-[16px] flex h-[48px] w-[48px] items-center justify-center rounded-full'>
        <span className='text-[24px] font-bold text-white'>!</span>
      </div>
      <p className='text-[18px] font-bold text-gray-900 md:text-[20px]'>
        정말 취소하시겠어요?
      </p>
      <Dialog.Footer variant='cancel'>
        <button
          className='flex-1 rounded-[8px] bg-gray-100 px-[16px] py-[12px] text-[14px] font-medium text-gray-700 transition-colors hover:bg-gray-200 md:text-[16px]'
          onClick={close}
        >
          아니요
        </button>
        <button
          className='bg-brand-2 hover:bg-brand-2/90 flex-1 rounded-[8px] px-[16px] py-[12px] text-[14px] font-medium text-white transition-colors md:text-[16px]'
          onClick={close}
        >
          취소하기
        </button>
      </Dialog.Footer>
    </div>
  );
}

function ReviewDialogContent() {
  const { close } = useDialogActions();

  return (
    <div>
      <div className='mb-[16px] flex items-center justify-between'>
        <h3 className='text-[16px] font-bold text-gray-900 md:text-[18px]'>
          함께 배우면 즐거운 스트릿 댄스
        </h3>
      </div>
      <p className='mb-[16px] text-[12px] text-gray-600 md:text-[14px]'>
        2023. 02. 14 / 11:00 - 12:30 (10명)
      </p>

      <div className='mb-[16px] flex justify-center gap-[8px]'>
        {[1, 2, 3, 4, 5].map((star) => (
          <div
            key={star}
            className='h-[24px] w-[24px] rounded-full bg-gray-200'
          ></div>
        ))}
      </div>

      <h4 className='mb-[12px] text-[14px] font-bold text-gray-900 md:text-[16px]'>
        소중한 경험을 들려주세요
      </h4>

      <textarea
        className='h-[100px] w-full resize-none rounded-[8px] border border-gray-200 p-[12px] text-[14px] placeholder:text-gray-400'
        placeholder='체험에서 느낀 경험을 자유롭게 남겨주세요'
      />
      <div className='mt-[8px] text-right text-[12px] text-gray-400'>0/100</div>

      <Dialog.Footer variant='review'>
        <button
          className='bg-brand-2 hover:bg-brand-2/90 w-full rounded-[8px] px-[16px] py-[12px] text-[14px] font-medium text-white transition-colors md:text-[16px]'
          onClick={close}
        >
          작성하기
        </button>
      </Dialog.Footer>
    </div>
  );
}

export default function page() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-[20px] p-24'>
      {/* Complete Dialog */}
      <Dialog.Root>
        <Dialog.Trigger>
          <button className='rounded-[8px] bg-green-500 px-[20px] py-[14px] text-[16px] font-medium text-white transition-colors hover:bg-green-600'>
            Complete Dialog
          </button>
        </Dialog.Trigger>

        <Dialog.Content variant='complete'>
          <CompleteDialogContent />
        </Dialog.Content>
      </Dialog.Root>

      {/* Cancel Dialog */}
      <Dialog.Root>
        <Dialog.Trigger>
          <button className='bg-red hover:bg-red/90 rounded-[8px] px-[20px] py-[14px] text-[16px] font-medium text-white transition-colors'>
            Cancel Dialog
          </button>
        </Dialog.Trigger>

        <Dialog.Content variant='cancel'>
          <CancelDialogContent />
        </Dialog.Content>
      </Dialog.Root>

      {/* Review Dialog */}
      <Dialog.Root>
        <Dialog.Trigger>
          <button className='rounded-[8px] bg-purple-500 px-[20px] py-[14px] text-[16px] font-medium text-white transition-colors hover:bg-purple-600'>
            Review Dialog
          </button>
        </Dialog.Trigger>

        <Dialog.Content variant='review'>
          <ReviewDialogContent />
        </Dialog.Content>
      </Dialog.Root>
    </main>
  );
}
