import Button from '@/shared/components/Button';
import { Dialog } from '@/shared/components/ui/dialog';

const LeaveConfirmDialogContent = ({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  return (
    <div className='text-center'>
      <div className='bg-red mx-auto mb-[16px] flex h-[48px] w-[48px] items-center justify-center rounded-full'>
        <span className='text-[24px] font-bold text-white'>!</span>
      </div>
      <p className='text-[18px] font-bold text-gray-900 md:text-[20px]'>
        정말 나가시겠습니까? 저장되지 않은 변경사항이 있습니다.
      </p>
      <p className='mt-[8px] text-[14px] text-gray-600'>
        이 작업은 되돌릴 수 없습니다.
      </p>
      <Dialog.Footer variant='cancel'>
        <Button
          className='flex-1 rounded-[8px] bg-gray-100 px-[16px] py-[12px] text-[14px] font-medium text-gray-700 transition-colors hover:bg-gray-200 disabled:opacity-50 disabled:hover:bg-gray-100 aria-disabled:opacity-50 aria-disabled:hover:bg-gray-100 md:text-[16px]'
          onClick={onCancel}
        >
          취소
        </Button>
        <Button
          className='bg-red hover:bg-red/90 disabled:hover:bg-red aria-disabled:hover:bg-red flex-1 rounded-[8px] px-[16px] py-[12px] text-[14px] font-medium text-white transition-colors disabled:opacity-50 aria-disabled:opacity-50 md:text-[16px]'
          onClick={onConfirm}
        >
          나가기
        </Button>
      </Dialog.Footer>
    </div>
  );
};

export const LeaveConfirmDialog = ({
  open,
  onOpenChange,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content variant='complete'>
        <LeaveConfirmDialogContent onConfirm={onConfirm} onCancel={onCancel} />
      </Dialog.Content>
    </Dialog.Root>
  );
};
