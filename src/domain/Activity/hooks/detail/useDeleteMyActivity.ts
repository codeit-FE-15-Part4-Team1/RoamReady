import { useMutation } from '@tanstack/react-query';

import { deleteMyActivity } from '@/domain/Activity/services/detail/deleteMyActivity';
import { useToast } from '@/shared/hooks/useToast';

/**
 * 체험 삭제 요청을 수행하는 커스텀 훅
 * - 내부에서 useMutation 사용
 * - mutateAsync를 감춰서 외부에서는 함수처럼 바로 호출 가능
 */
export const useDeleteMyActivity = () => {
  const { showSuccess, showError, showWarning } = useToast();

  const { mutateAsync } = useMutation({
    mutationFn: deleteMyActivity,
    onSuccess: () => {
      showSuccess('체험이 성공적으로 삭제되었습니다.');
    },
    onError: async (error: any) => {
      const status = error?.status ?? error?.response?.status;

      switch (status) {
        case 401:
          showError('로그인이 필요합니다.');
          break;
        case 403:
          showWarning('본인의 체험만 삭제할 수 있습니다.');
          break;
        case 404:
          showError('존재하지 않는 체험입니다.');
          break;
        case 409:
          showWarning('신청 예약이 있는 체험은 삭제할 수 없습니다.');
          break;
        default:
          showError('체험 삭제 중 알 수 없는 오류가 발생했습니다.');
      }
    },
  });

  return mutateAsync;
};
