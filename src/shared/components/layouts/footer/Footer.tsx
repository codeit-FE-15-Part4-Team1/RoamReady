import Image from 'next/image';

import Container from '@/app/_components/Container';
import Logo2 from '@/shared/assets/logos/LogoTextTwoline';

/**
 * Footer 컴포넌트
 *
 * RoamReady 서비스의 하단 정보를 보여주는 푸터 영역입니다.
 * 로고, 브랜드 슬로건, GitHub 링크, 팀원 정보를 포함합니다.
 *
 * - 좌측: 로고와 브랜드 문구, 저작권 표기
 * - 우측: GitHub 저장소 링크 및 팀원 이름
 *
 * @example
 * ```tsx
 * <Footer />
 * ```
 */
export default function Footer() {
  return (
    <footer className='border-t border-gray-50 py-10'>
      <Container>
        {/* 푸터 전체 컨테이너: 좌우 영역 분할 */}
        <div className='flex justify-between'>
          {/* 좌측 영역: 로고, 브랜드 슬로건, CopyRight sign */}
          <div className='flex flex-col gap-10'>
            <Logo2 className='h-70 w-70' />
            <div className='flex flex-col gap-3'>
              <span className='text-gray-800'>
                Start your journey with RoamReady
              </span>
              <span className='text-gray-300'>
                © 2025 RoamReady, Codeit Sprint Part4 Team1
              </span>
            </div>
          </div>

          {/* 우측 영역: GitHub 링크 및 팀원 정보 */}
          <div className='flex flex-col items-end gap-10'>
            <a
              aria-label='GitHub repository'
              href='https://github.com/codeit-FE-15-Part4-Team1/RoamReady'
              rel='noopener noreferrer'
              target='_blank'
            >
              <Image
                src='/icons/github-logo.svg'
                alt='GitHub Logo'
                width={30}
                height={30}
              />
            </a>
            <p>김서연 | 박재현 | 송시은 | 유용민</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
