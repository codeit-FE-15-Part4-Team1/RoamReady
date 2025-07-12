'use client';

import { ReactNode } from 'react';

import { CodeBlock } from '@/shared/components/ui/code-block';
import { Dialog } from '@/shared/components/ui/Dialog';

// 비동기 작업 시뮬레이션 함수들
const simulateAsyncSuccess = (message: string, delay: number = 2000) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log(`✅ ${message} 완료`);
      resolve();
    }, delay);
  });
};

const simulateAsyncFailure = (message: string, delay: number = 2000) => {
  return new Promise<void>((_, reject) => {
    setTimeout(() => {
      console.log(`❌ ${message} 실패`);
      reject(new Error(`${message} 처리 중 오류가 발생했습니다.`));
    }, delay);
  });
};

// Dialog 내부에서 사용할 버튼 컴포넌트들
function CompleteDialogContent() {
  return (
    <div className='text-center'>
      <p className='text-[18px] font-bold text-gray-900 md:text-[20px]'>
        로그인에 성공했습니다.
      </p>
      <Dialog.Footer variant='complete'>
        <button className='bg-brand-2 hover:bg-brand-2/90 disabled:hover:bg-brand-2 aria-disabled:hover:bg-brand-2 w-[130px] rounded-[8px] px-[16px] py-[12px] text-[14px] font-medium text-white transition-colors disabled:opacity-50 aria-disabled:opacity-50 md:w-[160px] md:text-[16px]'>
          확인
        </button>
      </Dialog.Footer>
    </div>
  );
}

function CancelDialogContent() {
  return (
    <div className='text-center'>
      <div className='bg-red mx-auto mb-[16px] flex h-[48px] w-[48px] items-center justify-center rounded-full'>
        <span className='text-[24px] font-bold text-white'>!</span>
      </div>
      <p className='text-[18px] font-bold text-gray-900 md:text-[20px]'>
        정말 계정을 삭제하시겠어요?
      </p>
      <p className='mt-[8px] text-[14px] text-gray-600'>
        이 작업은 되돌릴 수 없습니다.
      </p>
      <Dialog.Footer variant='cancel'>
        <button
          className='aria- flex-1 rounded-[8px] bg-gray-100 px-[16px] py-[12px] text-[14px] font-medium text-gray-700 transition-colors hover:bg-gray-200 disabled:opacity-50 disabled:hover:bg-gray-100 aria-disabled:opacity-50 aria-disabled:hover:bg-gray-100 md:text-[16px]'
          onClick={() => {
            console.log('취소됨');
          }}
        >
          취소
        </button>
        <button
          className='bg-red hover:bg-red/90 disabled:hover:bg-red aria-disabled:hover:bg-red aria- flex-1 rounded-[8px] px-[16px] py-[12px] text-[14px] font-medium text-white transition-colors disabled:opacity-50 aria-disabled:opacity-50 md:text-[16px]'
          onClick={async () => {
            await simulateAsyncSuccess('계정 삭제', 1500);
          }}
        >
          삭제하기
        </button>
      </Dialog.Footer>
    </div>
  );
}

function ReviewDialogContent() {
  return (
    <div>
      <div className='mb-[16px] flex items-center justify-between'>
        <h3 className='text-[16px] font-bold text-gray-900 md:text-[18px]'>
          함께 배우면 즐거운 스트릿 댄스
        </h3>
      </div>
      <p className='mb-[16px] text-[12px] text-gray-600 md:text-[14px]'>
        2023. 02. 14 / 11:00 - 12:30 (10명)
      </p>

      <div className='mb-[16px] flex justify-center gap-[8px]'>
        {[1, 2, 3, 4, 5].map((star) => (
          <div
            key={star}
            className='h-[24px] w-[24px] rounded-full bg-gray-200'
          ></div>
        ))}
      </div>

      <h4 className='mb-[12px] text-[14px] font-bold text-gray-900 md:text-[16px]'>
        소중한 경험을 들려주세요
      </h4>

      <textarea
        className='h-[100px] w-full resize-none rounded-[8px] border border-gray-200 p-[12px] text-[14px] placeholder:text-gray-400'
        placeholder='체험에서 느낀 경험을 자유롭게 남겨주세요'
      />
      <div className='mt-[8px] text-right text-[12px] text-gray-400'>0/100</div>

      <Dialog.Footer variant='review'>
        <button
          className='bg-brand-2 hover:bg-brand-2/90 disabled:hover:bg-brand-2 aria-disabled:hover:bg-brand-2 aria- w-full rounded-[8px] px-[16px] py-[12px] text-[14px] font-medium text-white transition-colors disabled:opacity-50 aria-disabled:opacity-50 md:text-[16px]'
          onClick={async () => {
            await simulateAsyncSuccess('리뷰 제출', 1500);
          }}
        >
          제출하기
        </button>
      </Dialog.Footer>
    </div>
  );
}

// 비동기 작업 테스트용 컴포넌트들
function AsyncSuccessDialogContent() {
  return (
    <div className='text-center'>
      <p className='text-[18px] font-bold text-gray-900 md:text-[20px]'>
        비동기 작업 성공 테스트
      </p>
      <p className='mt-[8px] text-[14px] text-gray-600'>
        이 작업은 2초 후 성공합니다.
      </p>
      <Dialog.Footer variant='complete'>
        <button
          className='aria- w-[130px] rounded-[8px] bg-green-500 px-[16px] py-[12px] text-[14px] font-medium text-white transition-colors hover:bg-green-600 disabled:opacity-50 disabled:hover:bg-green-500 aria-disabled:opacity-50 aria-disabled:hover:bg-green-500 md:w-[160px] md:text-[16px]'
          onClick={async () => {
            await simulateAsyncSuccess('비동기 작업 성공', 2000);
          }}
        >
          성공 테스트
        </button>
      </Dialog.Footer>
    </div>
  );
}

function AsyncFailureDialogContent() {
  return (
    <div className='text-center'>
      <p className='text-[18px] font-bold text-gray-900 md:text-[20px]'>
        비동기 작업 실패 테스트
      </p>
      <p className='mt-[8px] text-[14px] text-gray-600'>
        이 작업은 2초 후 실패합니다.
      </p>
      <Dialog.Footer variant='complete'>
        <button
          className='aria- w-[130px] rounded-[8px] bg-red-500 px-[16px] py-[12px] text-[14px] font-medium text-white transition-colors hover:bg-red-600 disabled:opacity-50 disabled:hover:bg-red-500 aria-disabled:opacity-50 aria-disabled:hover:bg-red-500 md:w-[160px] md:text-[16px]'
          onClick={async () => {
            await simulateAsyncFailure('비동기 작업 실패', 2000);
          }}
        >
          실패 테스트
        </button>
      </Dialog.Footer>
    </div>
  );
}

function SyncDialogContent() {
  return (
    <div className='text-center'>
      <p className='text-[18px] font-bold text-gray-900 md:text-[20px]'>
        동기 작업 테스트
      </p>
      <p className='mt-[8px] text-[14px] text-gray-600'>
        이 작업은 즉시 완료됩니다.
      </p>
      <Dialog.Footer variant='complete'>
        <button
          className='aria- w-[130px] rounded-[8px] bg-blue-500 px-[16px] py-[12px] text-[14px] font-medium text-white transition-colors hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-blue-500 aria-disabled:opacity-50 aria-disabled:hover:bg-blue-500 md:w-[160px] md:text-[16px]'
          onClick={() => {
            console.log('✅ 동기 작업 즉시 완료');
          }}
        >
          즉시 완료
        </button>
      </Dialog.Footer>
    </div>
  );
}

function Code({ children }: { children: ReactNode }) {
  return (
    <code className='rounded-[4px] bg-gray-100 px-2 py-1 text-[14px]'>
      {children}
    </code>
  );
}

export default function page() {
  return (
    <main className='flex min-h-screen flex-col gap-20 p-24'>
      {/* 헤더 */}
      <div>
        <h1 className='text-[24px] font-bold text-gray-900 md:text-[32px]'>
          Dialog 컴포넌트 테스트 페이지
        </h1>
        <p className='text-[14px] text-gray-600 md:text-[16px]'>
          2025. 01. 12 기준 버전 2.0.0
        </p>
      </div>

      {/* 1. 개요 */}
      <section className='space-y-6'>
        <h2 className='text-[20px] font-bold text-gray-900 md:text-[24px]'>
          1. 개요
        </h2>
        <div className='space-y-4'>
          <p className='text-[14px] text-gray-700 md:text-[16px]'>
            Dialog 컴포넌트는 접근성과 사용자 경험을 고려한 모달 대화상자
            시스템입니다.
            <br />
            React Context API를 활용하여 상태를 관리하며, 비동기 작업 처리,
            포커스 트랩, 스크롤 관리 등의 기능을 제공합니다.
          </p>
          <div className='rounded-[8px] bg-blue-50 p-10'>
            <p className='text-[14px] text-blue-800'>
              <strong>2025. 07. 12</strong>
              <br />
              Zustand 전역 상태 관리에서 Context API 기반 로컬 상태 관리로
              변경했습니다.
            </p>
          </div>
        </div>
      </section>

      {/* 2. 주요 기능 */}
      <section className='space-y-8'>
        <h2 className='text-[20px] font-bold text-gray-900 md:text-[24px]'>
          2. 주요 기능
        </h2>

        {/* 2.1 Promise 자동 처리 */}
        <div className='space-y-4'>
          <h3 className='text-[18px] font-semibold text-gray-900'>
            2.1 Promise 자동 처리
          </h3>
          <p className='text-[14px] text-gray-700 md:text-[16px]'>
            Dialog를 통해 비동기 작업을 처리할 때, 자동으로 <Code>Promise</Code>{' '}
            상태를 관리합니다.
            <br />
            별도의 로딩 상태 관리 로직을 추가하지 않아도 됩니다.
          </p>
          <CodeBlock>
            {`// 로딩 상태 자동 관리
// 성공시 자동으로 Dialog 닫힘
<button onClick={async () => { await saveData(); }}>
  저장하기
</button>`}
          </CodeBlock>
        </div>

        {/* 2.2 Variant별 다른 동작 */}
        <div className='mt-20 space-y-4'>
          <h3 className='text-[18px] font-semibold text-gray-900'>
            2.2 Variant prop 지정
          </h3>
          <p className='text-[14px] text-gray-700 md:text-[16px]'>
            <Code>{`<Dialog.Content>`}</Code>와 <Code>{`<Dialog.Footer>`}</Code>
            의 <Code>variant</Code> prop을 통해 Dialog의 성격에 맞는 동작과
            레이아웃을 지정해줄 수 있습니다.
          </p>

          <div>
            <p className='text-[14px] text-gray-700 md:text-[16px]'>
              <Code>variant</Code> prop은 다음과 같은 값을 가질 수 있습니다:
            </p>
            <ul className='my-10 ml-6 list-disc space-y-2 text-[16px] text-gray-700'>
              <li>
                <Code>complete</Code>: 완료/확인 대화상자용 (기본값)
              </li>
              <li>
                <Code>cancel</Code>: 취소/확인 대화상자용
              </li>
              <li>
                <Code>review</Code>: 리뷰/평가 대화상자용
              </li>
            </ul>
            <CodeBlock>
              {`<Dialog.Content variant="complete">
              ...
  <Dialog.Footer variant="complete">
    <button>확인</button>
  </Dialog.Footer>
</Dialog.Content>`}
            </CodeBlock>
          </div>
        </div>

        {/* 2.3 핸들러 없는 버튼 지원 */}
        <div className='mt-20 space-y-4'>
          <h3 className='text-[18px] font-semibold text-gray-900'>
            2.3 핸들러 없는 버튼 지원
          </h3>
          <p className='text-[14px] text-gray-700 md:text-[16px]'>
            onClick 핸들러가 없는 버튼도 자동으로 Dialog를 닫습니다. 간단한 확인
            버튼 등에 유용합니다.
          </p>
          <CodeBlock>
            {`...
<Dialog.Footer>
  <button>확인</button> // onClick 없어도 자동으로 Dialog 닫힘
</Dialog.Footer>`}
          </CodeBlock>
        </div>

        {/* 2.4 로딩 상태 관리 */}
        <div className='mt-20 space-y-4'>
          <h3 className='text-[18px] font-semibold text-gray-900'>
            2.4 로딩 상태 관리
          </h3>
          <p className='text-[14px] text-gray-700 md:text-[16px]'>
            비동기 작업 실행 중에는 다음과 같은 UI 변경이 자동으로 적용됩니다:
          </p>
          <ul className='my-10 ml-6 list-disc space-y-2 text-[16px] text-gray-700'>
            <li>클릭된 버튼에만 로딩 스피너 표시</li>
            <li>
              나머지 버튼들은 <Code>disabled</Code> 처리
            </li>
            <li>모든 상호작용 차단 (ESC 키, 오버레이 클릭 등) </li>
          </ul>
        </div>

        {/* 2.5 에러 처리 */}
        <div className='space-y-4'>
          <h3 className='text-[18px] font-semibold text-gray-900'>
            2.5 에러 처리
          </h3>
          <p className='text-[14px] text-gray-700 md:text-[16px]'>
            비동기 작업 실패 시 자동으로 에러 메시지를 표시하고 Dialog는 열린
            상태를 유지합니다.
          </p>
          <CodeBlock>
            {`// 비동기 작업 실패 시 Error throw (Dialog 열린 상태 유지)
<button onClick={async () => { await riskyOperation(); }}>
  위험한 작업
</button>`}
          </CodeBlock>
        </div>
      </section>

      <div className='my-50 h-1 w-full bg-gray-200' />

      {/* 3. 주요 Props */}
      <section className='space-y-8'>
        <h2 className='text-[20px] font-bold text-gray-900 md:text-[24px]'>
          3. 주요 Props
        </h2>

        {/* 3.1 Dialog.Root */}
        <div className='space-y-4'>
          <h3 className='text-[18px] font-semibold text-gray-900'>
            3.1 Dialog.Root
          </h3>
          <p className='text-[14px] text-gray-700 md:text-[16px]'>
            Dialog 시스템의 루트 컴포넌트로, 컨텍스트를 제공하고 상태를
            관리합니다.
          </p>
          <div className='rounded-[8px] bg-gray-50 p-4'>
            <table className='w-full text-[14px]'>
              <thead>
                <tr className='border-b border-gray-200'>
                  <th className='py-2 text-left font-semibold text-gray-900'>
                    Props
                  </th>
                  <th className='py-2 text-left font-semibold text-gray-900'>
                    타입
                  </th>
                  <th className='py-2 text-left font-semibold text-gray-900'>
                    기본값
                  </th>
                  <th className='py-2 text-left font-semibold text-gray-900'>
                    설명
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='py-2 text-gray-700'>children</td>
                  <td className='py-2 text-gray-600'>ReactNode</td>
                  <td className='py-2 text-gray-600'>-</td>
                  <td className='py-2 text-gray-600'>Dialog 내부 컴포넌트들</td>
                </tr>
                <tr>
                  <td className='py-2 text-gray-700'>defaultOpen</td>
                  <td className='py-2 text-gray-600'>boolean</td>
                  <td className='py-2 text-gray-600'>false</td>
                  <td className='py-2 text-gray-600'>초기 열림 상태</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 3.2 Dialog.Content */}
        <div className='space-y-4'>
          <h3 className='text-[18px] font-semibold text-gray-900'>
            3.2 Dialog.Content
          </h3>
          <p className='text-[14px] text-gray-700 md:text-[16px]'>
            실제 모달 콘텐츠를 렌더링하고 포커스 트랩을 관리합니다.
          </p>
          <div className='rounded-[8px] bg-gray-50 p-4'>
            <table className='w-full text-[14px]'>
              <thead>
                <tr className='border-b border-gray-200'>
                  <th className='py-2 text-left font-semibold text-gray-900'>
                    Props
                  </th>
                  <th className='py-2 text-left font-semibold text-gray-900'>
                    타입
                  </th>
                  <th className='py-2 text-left font-semibold text-gray-900'>
                    기본값
                  </th>
                  <th className='py-2 text-left font-semibold text-gray-900'>
                    설명
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='py-2 text-gray-700'>children</td>
                  <td className='py-2 text-gray-600'>ReactNode</td>
                  <td className='py-2 text-gray-600'>-</td>
                  <td className='py-2 text-gray-600'>모달 내부 콘텐츠</td>
                </tr>
                <tr>
                  <td className='py-2 text-gray-700'>variant</td>
                  <td className='py-2 text-gray-600'>
                    {"'complete' | 'cancel' | 'review'"}
                  </td>
                  <td className='py-2 text-gray-600'>-</td>
                  <td className='py-2 text-gray-600'>Dialog 동작 타입</td>
                </tr>
                <tr>
                  <td className='py-2 text-gray-700'>className</td>
                  <td className='py-2 text-gray-600'>string</td>
                  <td className='py-2 text-gray-600'>-</td>
                  <td className='py-2 text-gray-600'>추가 CSS 클래스</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 3.3 Dialog.Footer */}
        <div className='space-y-4'>
          <h3 className='text-[18px] font-semibold text-gray-900'>
            3.3 Dialog.Footer
          </h3>
          <p className='text-[14px] text-gray-700 md:text-[16px]'>
            액션 버튼들을 담는 푸터 영역을 제공합니다.
          </p>
          <div className='rounded-[8px] bg-gray-50 p-4'>
            <table className='w-full text-[14px]'>
              <thead>
                <tr className='border-b border-gray-200'>
                  <th className='py-2 text-left font-semibold text-gray-900'>
                    Props
                  </th>
                  <th className='py-2 text-left font-semibold text-gray-900'>
                    타입
                  </th>
                  <th className='py-2 text-left font-semibold text-gray-900'>
                    기본값
                  </th>
                  <th className='py-2 text-left font-semibold text-gray-900'>
                    설명
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='py-2 text-gray-700'>children</td>
                  <td className='py-2 text-gray-600'>ReactNode</td>
                  <td className='py-2 text-gray-600'>-</td>
                  <td className='py-2 text-gray-600'>푸터 내부 버튼들</td>
                </tr>
                <tr>
                  <td className='py-2 text-gray-700'>variant</td>
                  <td className='py-2 text-gray-600'>
                    &apos;complete&apos; | &apos;cancel&apos; |
                    &apos;review&apos;
                  </td>
                  <td className='py-2 text-gray-600'>-</td>
                  <td className='py-2 text-gray-600'>푸터 스타일 타입</td>
                </tr>
                <tr>
                  <td className='py-2 text-gray-700'>className</td>
                  <td className='py-2 text-gray-600'>string</td>
                  <td className='py-2 text-gray-600'>-</td>
                  <td className='py-2 text-gray-600'>추가 CSS 클래스</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 3.4 useDialogContext */}
        <div className='space-y-4'>
          <h3 className='text-[18px] font-semibold text-gray-900'>
            3.4 useDialogContext 훅
          </h3>
          <p className='text-[14px] text-gray-700 md:text-[16px]'>
            Dialog 내부에서 프로그래밍적으로 Dialog를 제어할 수 있는 훅입니다.
          </p>
          <div className='rounded-[8px] bg-gray-50 p-4'>
            <table className='w-full text-[14px]'>
              <thead>
                <tr className='border-b border-gray-200'>
                  <th className='py-2 text-left font-semibold text-gray-900'>
                    반환값
                  </th>
                  <th className='py-2 text-left font-semibold text-gray-900'>
                    타입
                  </th>
                  <th className='py-2 text-left font-semibold text-gray-900'>
                    설명
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='py-2 text-gray-700'>close</td>
                  <td className='py-2 text-gray-600'>{'() => void'}</td>
                  <td className='py-2 text-gray-600'>Dialog를 닫는 함수</td>
                </tr>
                <tr>
                  <td className='py-2 text-gray-700'>open</td>
                  <td className='py-2 text-gray-600'>{'() => void'}</td>
                  <td className='py-2 text-gray-600'>Dialog를 여는 함수</td>
                </tr>
                <tr>
                  <td className='py-2 text-gray-700'>loading</td>
                  <td className='py-2 text-gray-600'>boolean</td>
                  <td className='py-2 text-gray-600'>로딩 상태</td>
                </tr>
                <tr>
                  <td className='py-2 text-gray-700'>error</td>
                  <td className='py-2 text-gray-600'>string | null</td>
                  <td className='py-2 text-gray-600'>에러 메시지</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className='my-50 h-1 w-full bg-gray-200' />

      {/* 4. 사용법 */}
      <section className='space-y-8'>
        <h2 className='text-[20px] font-bold text-gray-900 md:text-[24px]'>
          4. 사용법
        </h2>

        {/* 4.1 기본 사용법 */}
        <div className='flex flex-1 flex-col justify-between space-y-6'>
          <h3 className='text-[18px] font-semibold text-gray-900'>
            4.1 <Code>complete</Code> dialog
          </h3>
          <div className='flex gap-30'>
            <div>
              <Dialog.Root>
                <Dialog.Trigger>
                  <button className='rounded-[8px] bg-green-500 px-[20px] py-[14px] text-[16px] font-medium text-white transition-colors hover:bg-green-600'>
                    Complete Dialog
                  </button>
                </Dialog.Trigger>
                <Dialog.Content variant='complete'>
                  <CompleteDialogContent />
                </Dialog.Content>
              </Dialog.Root>
            </div>
            <div className='flex-1'>
              <CodeBlock>
                {`<Dialog.Root>
  <Dialog.Trigger>
    <button>Complete Dialog</button>
  </Dialog.Trigger>
  
  <Dialog.Content variant='complete'>
    <div className='text-center'>
      <h1 className='text-[24px] font-bold text-gray-900'>
        로그인에 성공했습니다
      </h1>
      <Dialog.Footer variant='complete'>
        <button>확인</button>
      </Dialog.Footer>
    </div>
  </Dialog.Content>
</Dialog.Root>`}
              </CodeBlock>
            </div>
          </div>
        </div>

        <div className='flex flex-1 flex-col justify-between space-y-6'>
          <h3 className='text-[18px] font-semibold text-gray-900'>
            4.2 <Code>cancel</Code> dialog
          </h3>
          <div className='flex justify-between gap-30'>
            <div>
              <Dialog.Root>
                <Dialog.Trigger>
                  <button className='rounded-[8px] bg-red-500 px-[20px] py-[14px] text-[16px] font-medium text-white transition-colors hover:bg-red-600'>
                    Cancel Dialog
                  </button>
                </Dialog.Trigger>
                <Dialog.Content variant='cancel'>
                  <CancelDialogContent />
                </Dialog.Content>
              </Dialog.Root>
            </div>
            <div className='flex-1'>
              <CodeBlock>
                {`<Dialog.Root>
  <Dialog.Trigger>
    <button>Complete Dialog</button>
  </Dialog.Trigger>
  
  <Dialog.Content variant='cancel'>
  <div className='text-center'>
    <p>정말 삭제하시겠습니까?</p>
    <Dialog.Footer variant='cancel'>
      <button>
        취소
      </button>
      <button onClick={async () => await deleteData()}>
        삭제
      </button>
    </Dialog.Footer>
  </div>
  </Dialog.Content>
</Dialog.Root>`}
              </CodeBlock>
            </div>
          </div>
        </div>

        <div className='flex flex-1 flex-col space-y-6'>
          <h3 className='text-[18px] font-semibold text-gray-900'>
            4.3 <Code>review</Code> dialog
          </h3>
          <div className='flex justify-between gap-30'>
            <div>
              <Dialog.Root>
                <Dialog.Trigger>
                  <button className='rounded-[8px] bg-purple-500 px-[20px] py-[14px] text-[16px] font-medium text-white transition-colors hover:bg-purple-600'>
                    Review Dialog
                  </button>
                </Dialog.Trigger>
                <Dialog.Content variant='review'>
                  <ReviewDialogContent />
                </Dialog.Content>
              </Dialog.Root>
            </div>
            <div className='flex-1'>
              <CodeBlock>
                {`<Dialog.Root>
  <Dialog.Trigger>
    <button>Review Dialog</button>
  </Dialog.Trigger>
  
  <Dialog.Content variant='review'>
      <ReviewForm />
      <Dialog.Footer variant='review'>
        <button onClick={async () => await submitReview()}>
          제출하기
        </button>
      </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>`}
              </CodeBlock>
            </div>
          </div>
        </div>

        <div className='my-50 h-1 w-full bg-gray-200' />

        {/* 4.3 비동기 작업 처리 */}
        <div className='space-y-6'>
          <h3 className='text-[18px] font-semibold text-gray-900'>
            5. <Code>Promise</Code> 대응 (비동기 작업 처리)
          </h3>
          <p className='text-[14px] text-gray-700 md:text-[16px]'>
            비동기 작업의 성공, 실패 시나리오를 테스트 해볼 수 있습니다.
          </p>

          <div className='flex flex-1 flex-col'>
            <h3 className='mt-10 text-[16px] font-semibold text-gray-900'>
              성공 시나리오
            </h3>
            <p className='mb-10 text-[16px] text-gray-700'>
              2초 후 성공하는 비동기 작업
            </p>

            <div className='flex justify-between gap-30'>
              <div>
                <Dialog.Root>
                  <Dialog.Trigger>
                    <button className='w-full rounded-[8px] bg-green-500 px-[20px] py-[14px] text-[16px] font-medium text-white transition-colors hover:bg-green-600'>
                      성공 테스트
                    </button>
                  </Dialog.Trigger>
                  <Dialog.Content variant='complete'>
                    <AsyncSuccessDialogContent />
                  </Dialog.Content>
                </Dialog.Root>
              </div>
              <div className='flex-1'>
                <CodeBlock>
                  {`// 성공 시 자동으로 Dialog 닫힘
<button onClick={async () => { await saveData(); }}>
  저장하기
</button>`}
                </CodeBlock>
              </div>
            </div>
          </div>

          <div className='flex flex-1 flex-col'>
            <h3 className='mt-10 text-[16px] font-semibold text-gray-900'>
              실패 시나리오
            </h3>
            <p className='mb-10 text-[16px] text-gray-700'>
              2초 후 실패하는 비동기 작업
            </p>

            <div className='flex justify-between gap-30'>
              <div>
                <Dialog.Root>
                  <Dialog.Trigger>
                    <button className='w-full rounded-[8px] bg-red-500 px-[20px] py-[14px] text-[16px] font-medium text-white transition-colors hover:bg-red-600'>
                      실패 테스트
                    </button>
                  </Dialog.Trigger>
                  <Dialog.Content variant='complete'>
                    <AsyncFailureDialogContent />
                  </Dialog.Content>
                </Dialog.Root>
              </div>
              <div className='flex-1'>
                <CodeBlock>
                  {`<button onClick={async () => {
  try {
    await riskyOperation();
  } catch (error) {
    // 자동으로 에러 메시지 표시
    // Dialog는 열린 상태 유지
  }
}}>
  위험한 작업
</button>`}
                </CodeBlock>
              </div>
            </div>
          </div>

          <div className='flex flex-1 flex-col'>
            <h3 className='mt-10 text-[16px] font-semibold text-gray-900'>
              동기 작업
            </h3>
            <p className='mb-10 text-[16px] text-gray-700'>
              즉시 완료되는 동기 작업
            </p>

            <div className='flex justify-between gap-30'>
              <div>
                <Dialog.Root>
                  <Dialog.Trigger>
                    <button className='w-full rounded-[8px] bg-blue-500 px-[20px] py-[14px] text-[16px] font-medium text-white transition-colors hover:bg-blue-600'>
                      동기 테스트
                    </button>
                  </Dialog.Trigger>
                  <Dialog.Content variant='complete'>
                    <SyncDialogContent />
                  </Dialog.Content>
                </Dialog.Root>
              </div>
              <div className='flex-1'>
                <CodeBlock>
                  {`<button onClick={() => {
  console.log('동기 작업 완료');
  // 즉시 Dialog 닫힘
}}>
  즉시 완료
</button>`}
                </CodeBlock>
              </div>
            </div>
          </div>
        </div>

        <div className='my-50 h-1 w-full bg-gray-200' />

        {/* 4.4 고급 사용법 */}
        <div className='space-y-6'>
          {/* 기본값으로 열린 Dialog */}
          <h3 className='text-[18px] font-semibold text-gray-900'>
            6. 페이지 로드 시 자동으로 Dialog 열기
          </h3>
          <div className='space-y-4'>
            <p className='text-[14px] text-gray-700 md:text-[16px]'>
              <Code>Dialog.Root</Code> 컴포넌트에{' '}
              <code className='rounded-[4px] bg-gray-100 px-2 py-1 text-[14px]'>
                defaultOpen
              </code>{' '}
              props를 <Code>true</Code>로 설정하면 페이지 로드 시 자동으로
              열리는 Dialog를 만들 수 있습니다.
            </p>
            <div className='flex flex-1 flex-col'>
              <div className='mt-30 flex justify-between gap-30'>
                <div>
                  <Dialog.Root>
                    <Dialog.Trigger>
                      <button className='w-full rounded-[8px] bg-orange-500 px-[20px] py-[14px] text-[16px] font-medium text-white transition-colors hover:bg-orange-600'>
                        Dialog 열기
                      </button>
                    </Dialog.Trigger>
                    <Dialog.Content variant='complete'>
                      <CompleteDialogContent />
                    </Dialog.Content>
                  </Dialog.Root>
                </div>
                <div className='flex-1'>
                  <CodeBlock>
                    {`<Dialog.Root defaultOpen={true}>
  <Dialog.Trigger>
    <button>Dialog 열기</button>
  </Dialog.Trigger>
  <Dialog.Content variant='complete'>
  ...
  <Dialog.Footer variant='complete'>
    <button>확인</button>
  </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>`}
                  </CodeBlock>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
