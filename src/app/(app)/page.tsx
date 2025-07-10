import Link from 'next/link';

import Button from '@/shared/components/Button';

export default function HomePage() {
  return (
    <div>
      <Button asChild>
        <Link href='/'>홈으로</Link>
      </Button>
    </div>
  );
}
