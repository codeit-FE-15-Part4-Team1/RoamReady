import { ROUTES } from '@/shared/constants/route';

import {
  ExperiencesIcon,
  InfoIcon,
  ReservationsIcon,
  ReservationStatusIcon,
} from '../components/icons';

export const MENU_ITEMS = [
  { href: ROUTES.MYPAGE.INFO, label: '내 정보', icon: InfoIcon },
  {
    href: ROUTES.MYPAGE.RESERVATIONS,
    label: '예약 내역',
    icon: ReservationsIcon,
  },
  {
    href: ROUTES.MYPAGE.EXPERIENCES,
    label: '내 체험 관리',
    icon: ExperiencesIcon,
  },
  {
    href: ROUTES.MYPAGE.RESERVATIONS_STATUS,
    label: '예약 현황',
    icon: ReservationStatusIcon,
  },
] as const;
