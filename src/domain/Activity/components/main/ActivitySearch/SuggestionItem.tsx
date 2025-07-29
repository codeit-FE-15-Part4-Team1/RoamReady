import { ReactNode } from 'react';

interface SuggestionItemProps {
  icon: ReactNode;
  primaryText: string;
  secondaryText?: string;
  onClick: () => void;
}

export default function SuggestionItem({
  icon,
  primaryText,
  secondaryText,
  onClick,
}: SuggestionItemProps) {
  return (
    <li
      className='flex cursor-pointer items-center gap-16 rounded-lg p-8 hover:bg-neutral-100'
      onMouseDown={onClick} // 클릭 후 input의 onBlur가 실행되는 것을 막기 위해 onMouseDown 사용
    >
      <div className='flex h-48 w-48 items-center justify-center rounded-md bg-neutral-200'>
        {icon}
      </div>
      <div>
        <p className='font-size-16 font-semibold text-neutral-800'>
          {primaryText}
        </p>
        {secondaryText && (
          <p className='font-size-14 text-neutral-600'>{secondaryText}</p>
        )}
      </div>
    </li>
  );
}
