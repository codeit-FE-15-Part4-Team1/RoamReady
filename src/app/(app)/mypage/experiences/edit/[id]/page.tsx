'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import CreateActivityForm from '@/domain/User/components/create-activity/CreateActivityForm';
import { LeaveConfirmDialog } from '@/domain/User/components/create-activity/LeaveConfirmDialog';

export default function EditExperiencePage() {
  const router = useRouter();
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const isLeavingRef = useRef(false);
  const originalHistoryLength = useRef(0);

  // 컴포넌트 마운트 시 히스토리 길이 저장
  useEffect(() => {
    originalHistoryLength.current = window.history.length;
  }, []);

  // popstate 이벤트 처리 - 더 간단한 방식
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (isLeavingRef.current) {
        return;
      }

      if (isFormDirty) {
        // 뒤로가기를 방지하기 위해 다시 현재 페이지로 이동
        e.preventDefault();
        window.history.pushState(null, '', window.location.href);
        setShowLeaveDialog(true);
      }
    };

    // 폼이 더러워지면 현재 상태를 히스토리에 추가
    if (isFormDirty) {
      window.history.pushState(null, '', window.location.href);
    }

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isFormDirty]);

  const handleConfirmLeave = () => {
    // 다이얼로그 닫기
    setShowLeaveDialog(false);

    // 폼 상태 정리
    setIsFormDirty(false);

    router.push('/mypage/experiences');
  };

  const handleCancelLeave = () => {
    console.log('나가기 취소됨');
    setShowLeaveDialog(false);
  };
  return (
    <>
      <div className='mb-[3.4rem] max-w-[120rem]'>
        <h1 className='font-size-18 py-20 font-bold'>내 체험 등록</h1>
        <CreateActivityForm onDirtyChange={setIsFormDirty} />
      </div>

      <LeaveConfirmDialog
        open={showLeaveDialog}
        onOpenChange={setShowLeaveDialog}
        onConfirm={handleConfirmLeave}
        onCancel={handleCancelLeave}
      />
    </>
  );
}
