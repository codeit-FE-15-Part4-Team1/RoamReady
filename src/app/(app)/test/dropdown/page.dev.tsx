'use client';

import { EllipsisVertical } from 'lucide-react';

import Dropdown from '@/shared/components/ui/dropdown';

export default function DropdownTestPage() {
  return (
    <div className='mt-100 flex justify-center gap-100'>
      <Dropdown>
        <Dropdown.Trigger>
          <div className='bg-brand-2 h-50 w-50 rounded-full' />
        </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => alert('로그아웃')}>
            로그아웃
          </Dropdown.Item>
          <Dropdown.Item onClick={() => alert('마이페이지')}>
            마이페이지
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown>
        <Dropdown.Trigger>
          <EllipsisVertical />
        </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => alert('수정하기')}>
            수정하기
          </Dropdown.Item>
          <Dropdown.Item onClick={() => alert('삭제하기')}>
            삭제하기
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
