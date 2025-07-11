import { useContext } from 'react';

import { PopoverContext } from './PopoverRoot';

export const usePopover = () => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error(
      'usePopover는 Popover 컴포넌트 내에서만 사용할 수 있습니다.',
    );
  }
  return context;
};
