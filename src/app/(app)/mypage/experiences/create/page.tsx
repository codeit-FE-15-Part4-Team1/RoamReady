'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import CreateActivityForm from '@/domain/User/components/create-activity/CreateActivityForm';
import CreateActivityFormSkeleton from '@/domain/User/components/create-activity/CreateFormSkeleton';
import { LeaveConfirmDialog } from '@/domain/User/components/create-activity/LeaveConfirmDialog';

export default function CreateExperiencePage() {
  const router = useRouter();
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const isLeavingRef = useRef(false);

  useEffect(() => {
    const handlePopState = () => {
      // 이미 나가는 중이면 무시
      if (isLeavingRef.current) {
        return;
      }

      if (isFormDirty) {
        setShowLeaveDialog(true);
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isFormDirty]);

  useEffect(() => {
    if (isFormDirty && !isLeavingRef.current) {
      window.history.pushState(null, '', window.location.href);
    }
  }, [isFormDirty]);

  const handleConfirmLeave = () => {
    isLeavingRef.current = true;

    setShowLeaveDialog(false);

    setIsFormDirty(false);

    // 페이지 이동
    router.push('/mypage/experiences');
  };

  const handleCancelLeave = () => {
    setShowLeaveDialog(false);

    window.history.pushState(null, '', window.location.href);
  };

  return (
    <>
      <div className='mb-[3.4rem] max-w-[120rem]'>
        <h1 className='font-size-18 py-20 font-bold'>내 체험 등록</h1>
        <CreateActivityForm onDirtyChange={setIsFormDirty} />
        <CreateActivityFormSkeleton />
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
