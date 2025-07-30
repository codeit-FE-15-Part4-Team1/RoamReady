'use client';

import Tabs from '@/shared/components/ui/tabs';

export default function TabsTestPage() {
  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className='mx-auto max-w-4xl space-y-8'>
        <div className='text-center'>
          <h1 className='mb-2 text-4xl font-bold text-gray-900'>
            Tabs Component
          </h1>
          <p className='text-gray-600'>
            기본 스타일의 다양한 탭 예시들을 확인해보세요
          </p>
        </div>

        {/* Basic Unstyled Tabs */}
        <div className='rounded-xl bg-white p-8 shadow-sm'>
          <h2 className='mb-6 text-2xl font-semibold text-gray-900'>
            Basic Unstyled Tabs
          </h2>
          <Tabs.Root defaultValue='tab1'>
            <Tabs.List>
              <Tabs.Trigger value='tab1'>Tab 1</Tabs.Trigger>
              <Tabs.Trigger value='tab2'>Tab 2</Tabs.Trigger>
              <Tabs.Trigger value='tab3'>Tab 3</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value='tab1'>
              <p>첫 번째 탭의 내용입니다.</p>
            </Tabs.Content>
            <Tabs.Content value='tab2'>
              <p>두 번째 탭의 내용입니다.</p>
            </Tabs.Content>
            <Tabs.Content value='tab3'>
              <p>세 번째 탭의 내용입니다.</p>
            </Tabs.Content>
          </Tabs.Root>
        </div>

        {/* Vertical Layout */}
        <div className='rounded-xl bg-white p-8 shadow-sm'>
          <h2 className='mb-6 text-2xl font-semibold text-gray-900'>
            Vertical Layout
          </h2>
          <Tabs.Root defaultValue='settings'>
            <div className='flex gap-4'>
              <Tabs.List className='flex w-32 flex-col space-y-1'>
                <Tabs.Trigger
                  value='settings'
                  className='w-full rounded px-3 py-2 text-left data-[state=active]:bg-gray-200'
                >
                  설정
                </Tabs.Trigger>
                <Tabs.Trigger
                  value='profile'
                  className='w-full rounded px-3 py-2 text-left data-[state=active]:bg-gray-200'
                >
                  프로필
                </Tabs.Trigger>
                <Tabs.Trigger
                  value='security'
                  className='w-full rounded px-3 py-2 text-left data-[state=active]:bg-gray-200'
                >
                  보안
                </Tabs.Trigger>
              </Tabs.List>
              <div className='flex-1'>
                <Tabs.Content value='settings' className='rounded border p-4'>
                  <h3 className='mb-2 font-semibold'>설정</h3>
                  <p>일반 설정 옵션들을 관리할 수 있습니다.</p>
                </Tabs.Content>
                <Tabs.Content value='profile' className='rounded border p-4'>
                  <h3 className='mb-2 font-semibold'>프로필</h3>
                  <p>사용자 프로필 정보를 수정할 수 있습니다.</p>
                </Tabs.Content>
                <Tabs.Content value='security' className='rounded border p-4'>
                  <h3 className='mb-2 font-semibold'>보안</h3>
                  <p>보안 관련 설정을 변경할 수 있습니다.</p>
                </Tabs.Content>
              </div>
            </div>
          </Tabs.Root>
        </div>

        {/* Different Content Types */}
        <div className='rounded-xl bg-white p-8 shadow-sm'>
          <h2 className='mb-6 text-2xl font-semibold text-gray-900'>
            Different Content Types
          </h2>
          <Tabs.Root defaultValue='text'>
            <Tabs.List className='flex space-x-2'>
              <Tabs.Trigger
                value='text'
                className='border-b-2 border-transparent px-3 py-2 data-[state=active]:border-blue-500'
              >
                텍스트
              </Tabs.Trigger>
              <Tabs.Trigger
                value='list'
                className='border-b-2 border-transparent px-3 py-2 data-[state=active]:border-blue-500'
              >
                리스트
              </Tabs.Trigger>
              <Tabs.Trigger
                value='form'
                className='border-b-2 border-transparent px-3 py-2 data-[state=active]:border-blue-500'
              >
                폼
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value='text' className='mt-4'>
              <div className='prose'>
                <h3>일반 텍스트 내용</h3>
                <p>
                  이것은 일반적인 텍스트 내용입니다. 탭 안에 다양한 타입의
                  콘텐츠를 넣을 수 있습니다.
                </p>
                <p>두 번째 문단입니다. 긴 텍스트도 잘 표시됩니다.</p>
              </div>
            </Tabs.Content>
            <Tabs.Content value='list' className='mt-4'>
              <h3 className='mb-3 font-semibold'>할 일 목록</h3>
              <ul className='space-y-2'>
                <li className='flex items-center space-x-2'>
                  <input type='checkbox' />
                  <span>첫 번째 할 일</span>
                </li>
                <li className='flex items-center space-x-2'>
                  <input type='checkbox' defaultChecked />
                  <span className='text-gray-500 line-through'>
                    완료된 할 일
                  </span>
                </li>
                <li className='flex items-center space-x-2'>
                  <input type='checkbox' />
                  <span>세 번째 할 일</span>
                </li>
              </ul>
            </Tabs.Content>
            <Tabs.Content value='form' className='mt-4'>
              <h3 className='mb-3 font-semibold'>간단한 폼</h3>
              <div className='max-w-sm space-y-3'>
                <div>
                  <label
                    htmlFor='name'
                    className='mb-1 block text-sm font-medium'
                  >
                    이름
                  </label>
                  <input
                    id='name'
                    type='text'
                    className='w-full rounded border px-3 py-2'
                    placeholder='이름을 입력하세요'
                  />
                </div>
                <div>
                  <label
                    htmlFor='email'
                    className='mb-1 block text-sm font-medium'
                  >
                    이메일
                  </label>
                  <input
                    id='email'
                    type='email'
                    className='w-full rounded border px-3 py-2'
                    placeholder='이메일을 입력하세요'
                  />
                </div>
                <button className='w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600'>
                  제출
                </button>
              </div>
            </Tabs.Content>
          </Tabs.Root>
        </div>

        {/* Simple Navigation Style */}
        <div className='rounded-xl bg-white p-8 shadow-sm'>
          <h2 className='mb-6 text-2xl font-semibold text-gray-900'>
            Simple Navigation Style
          </h2>
          <Tabs.Root defaultValue='overview'>
            <Tabs.List className='border-b'>
              <Tabs.Trigger
                value='overview'
                className='px-4 py-2 font-medium text-gray-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600'
              >
                개요
              </Tabs.Trigger>
              <Tabs.Trigger
                value='details'
                className='px-4 py-2 font-medium text-gray-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600'
              >
                상세정보
              </Tabs.Trigger>
              <Tabs.Trigger
                value='reviews'
                className='px-4 py-2 font-medium text-gray-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600'
              >
                리뷰
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value='overview' className='py-4'>
              <h3 className='mb-2 font-semibold'>제품 개요</h3>
              <p className='text-gray-600'>
                이 제품의 전반적인 소개와 주요 특징을 확인하세요.
              </p>
            </Tabs.Content>
            <Tabs.Content value='details' className='py-4'>
              <h3 className='mb-2 font-semibold'>상세 정보</h3>
              <p className='text-gray-600'>
                제품의 자세한 사양과 기능에 대한 정보입니다.
              </p>
            </Tabs.Content>
            <Tabs.Content value='reviews' className='py-4'>
              <h3 className='mb-2 font-semibold'>사용자 리뷰</h3>
              <p className='text-gray-600'>
                다른 사용자들의 후기와 평점을 확인해보세요.
              </p>
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>
    </div>
  );
}
