import Link from 'next/link';

import DeleteMyActivityModal from '@/domain/Reservation/components/my-activity-card/DeleteMyActivityModal';
import { Activity } from '@/domain/Reservation/schemas/activity';
import Button from '@/shared/components/Button';
import { ROUTES } from '@/shared/constants/routes';

interface MyActivityActionButtonProps {
  activity: Activity;
}

const MyActivity_ACTIONS = {
  EDIT: '수정하기',
  DELETE: '삭제하기',
} as const;

export default function MyActivityActionButton({
  activity,
}: MyActivityActionButtonProps) {
  const baseClassName = 'font-size-14 py-4 font-medium';

  return (
    <div className={`flex gap-8`}>
      <Link href={ROUTES.MYPAGE.EXPERIENCES_EDIT(activity.id)}>
        <Button
          type='button'
          size='small'
          variant='outline'
          className={`${baseClassName} border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-100/80`}
        >
          {MyActivity_ACTIONS.EDIT}
        </Button>
      </Link>

      <DeleteMyActivityModal activityId={activity.id}>
        <Button
          type='button'
          size='small'
          variant='outline'
          className={`${baseClassName} border-neutral-400 bg-neutral-400 text-neutral-100 hover:bg-neutral-400/80`}
        >
          {MyActivity_ACTIONS.DELETE}
        </Button>
      </DeleteMyActivityModal>
    </div>
  );
}
