import { useMutation } from '@tanstack/react-query';

import { deleteMyReservation } from '@/domain/Reservation/services/reservation/deleteMyReservation';
import { Dialog } from '@/shared/components/ui/dialog';
import { useToast } from '@/shared/hooks/useToast';
import { queryClient } from '@/shared/libs/queryClient';

interface CancelReservationModalProps {
  reservationId: number;
  children: React.ReactNode;
}

export default function CancelReservationModal({
  reservationId,
  children,
}: CancelReservationModalProps) {
  const { showSuccess, showError } = useToast();

  const { mutate } = useMutation({
    mutationFn: deleteMyReservation,
    onSuccess: () => {
      showSuccess('예약이 취소되었습니다.');
    },
    onError: (e) => {
      showError('예약 취소에 실패했습니다.');
      console.error(e);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['my-reservations'] });
    },
  });

  const handleConfirm = async () => {
    mutate(reservationId);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content variant='cancel'>
        <div className='text-center'>
          <div className='mx-auto mb-[16px] flex h-[48px] w-[48px] items-center justify-center rounded-full bg-red-400'>
            <span className='text-[24px] font-bold text-white'>!</span>
          </div>
          <p className='text-[18px] font-bold text-gray-900 md:text-[20px]'>
            예약을 취소하시겠어요?
          </p>
          <p className='mt-[8px] text-[14px] text-gray-600'>
            취소된 예약은 되돌릴 수 없습니다.
          </p>
          <Dialog.Footer variant='cancel'>
            <button
              type='button'
              className='flex-1 rounded-[8px] bg-gray-100 px-[16px] py-[12px] text-[14px] font-medium text-gray-700 transition-colors hover:bg-gray-200 disabled:opacity-50 disabled:hover:bg-gray-100 aria-disabled:opacity-50 aria-disabled:hover:bg-gray-100 md:text-[16px]'
            >
              취소
            </button>
            <button
              type='button'
              className='flex-1 cursor-pointer rounded-[8px] bg-red-500 px-[16px] py-[12px] text-[14px] font-medium text-white transition-colors hover:bg-red-400/90 disabled:opacity-50 disabled:hover:bg-red-400 aria-disabled:opacity-50 aria-disabled:hover:bg-red-400 md:text-[16px]'
              onClick={handleConfirm}
            >
              예약 취소
            </button>
          </Dialog.Footer>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
