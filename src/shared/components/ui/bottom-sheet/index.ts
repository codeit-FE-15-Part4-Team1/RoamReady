import { BottomSheetContent } from './BottomSheetContent';
import { BottomSheetFooter } from './BottomSheetFooter';
import { BottomSheetHeader } from './BottomSheetHeader';
import { BottomSheetRoot } from './BottomSheetRoot';
import { BottomSheetStep } from './BottomSheetStep';
import { BottomSheetTrigger } from './BottomSheetTrigger';

export const BottomSheet = {
  Root: BottomSheetRoot,
  Content: BottomSheetContent,
  Footer: BottomSheetFooter,
  Header: BottomSheetHeader,
  Step: BottomSheetStep,
  Trigger: BottomSheetTrigger,
} as const;
