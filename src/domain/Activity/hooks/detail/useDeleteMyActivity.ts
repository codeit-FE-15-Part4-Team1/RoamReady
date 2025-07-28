import { useMutation } from '@tanstack/react-query';

import { deleteMyActivity } from '@/domain/Activity/services/detail';
import { useToast } from '@/shared/hooks/useToast';

/**
 * 체험 삭제 요청을 수행하는 커스텀 훅
 * - 내부적으로 React Query의 useMutation을 사용하여 삭제 API를 호출합니다.
 * - mutateAsync 함수만 반환하여, 호출하는 곳에서는 async 함수처럼 사용 가능합니다.
 * - 삭제 성공 및 실패에 따라 토스트 메시지를 보여줍니다.
 *
 * @returns {(id: number) => Promise<void>} 체험 ID를 인자로 받아 삭제를 수행하는 비동기 함수
 *
 * @example
 * const deleteActivity = useDeleteMyActivity();
 *
 * // 삭제 버튼 클릭 시
 * await deleteActivity(activityId);
 */
export const useDeleteMyActivity = () => {
  const { showSuccess, showError, showWarning } = useToast();

  const { mutateAsync } = useMutation({
    // 삭제 API 호출 함수
    mutationFn: deleteMyActivity,

    // 삭제 성공 시 호출
    onSuccess: () => {
      showSuccess('체험이 성공적으로 삭제되었습니다.');
    },

    // 삭제 실패 시 상태 코드에 따른 에러 메시지 처리
    // @ts-ignore
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
        case 400:
          showWarning('신청 예약이 있는 체험은 삭제할 수 없습니다.');
          break;
        default:
          showError('체험 삭제 중 알 수 없는 오류가 발생했습니다.');
      }
    },
  });

  return mutateAsync;
};
