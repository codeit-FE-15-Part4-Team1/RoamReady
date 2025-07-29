import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import CreateActivityForm from '@/domain/User/components/create-activity/CreateActivityForm';

dayjs.extend(customParseFormat);

export default function CreateExperiencePage() {
  return (
    <div className='mb-[3.4rem] w-[120rem]'>
      <h1 className='font-size-18 py-20 font-bold'>내 체험 등록</h1>
      {/* 서버 컴포넌트가 클라이언트 컴포넌트를 렌더링 */}
      <CreateActivityForm />
    </div>
  );
}
