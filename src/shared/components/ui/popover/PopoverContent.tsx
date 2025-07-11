'use client';
import { usePopover } from './usePopover';

//div 속성을 전부 받을 수 있게 하기 위해서 이쪽에서 확장
interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function PopoverContent({
  children,
  ...props
}: PopoverContentProps) {
  const { isOpen, setIsOpen } = usePopover();

  if (!isOpen) return null; // 닫혀있으면 렌더링 안 함

  return (
    <>
      {/* 백드롭 */}
      <div
        className='fixed inset-0 z-40'
        onClick={() => setIsOpen(false)}
        role='presentation'
      />
      {/* 실제 콘텐츠 */}
      <div className='absolute z-50' {...props}>
        {children}
      </div>
    </>
  );
}
