import { redirect } from 'next/navigation';

import { ROUTES } from '@/shared/constants/routes';

export default function Home() {
  redirect(ROUTES.ACTIVITIES.ROOT);
}
