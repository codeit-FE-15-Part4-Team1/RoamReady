import { ReactNode } from 'react';

import ClientSessionProvider from '@/app/_components/ClientSessionProvider';
import type { User } from '@/domain/Auth/schemas/response';
import { getCurrentUser } from '@/domain/Auth/utils/serverAuth';
import Footer from '@/shared/components/layouts/footer/Footer';
import Header from '@/shared/components/layouts/header/Header';

/**
 * @description
 * 메인 애플리케이션의 공통 레이아웃을 정의하는 서버 컴포넌트입니다.
 * 모든 페이지에 일관된 UI(헤더, 푸터)를 제공하며, 서버에서 사용자 인증 상태를 확인하고
 * 이 정보를 `ClientSessionProvider`를 통해 하위 클라이언트 컴포넌트에서 사용할 수 있도록 전달합니다.
 * `getCurrentUser`를 통해 API 호출 없이 Next.js 서버 환경에서 사용자 정보를 빠르게 가져옵니다.
 *
 * @param {{ children: ReactNode }} props - 컴포넌트의 props입니다.
 * @param {ReactNode} props.children - 이 레이아웃 내부에 렌더링될 자식 요소입니다.
 * @returns {Promise<JSX.Element>} 헤더, 콘텐츠 영역, 푸터로 구성된 React 요소입니다.
 */
export default async function AppLayout({ children }: { children: ReactNode }) {
  const user: User | null = await getCurrentUser();

  return (
    <ClientSessionProvider initialUser={user}>
      <div className='flex min-h-screen flex-col'>
        <Header user={user} />
        <main className='flex-grow'>{children}</main>
        <Footer />
      </div>
    </ClientSessionProvider>
  );
}
