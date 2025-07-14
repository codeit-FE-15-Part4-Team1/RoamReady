'use client';

import { useState } from 'react';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/tabs';

export default function TabsTestPage() {
  const [selectedPlan, setSelectedPlan] = useState<string>('basic');

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className='mx-auto max-w-6xl space-y-8'>
        <div className='text-center'>
          <h1 className='mb-2 text-4xl font-bold text-gray-900'>
            Tabs Component
          </h1>
          <p className='text-gray-600'>
            다양한 탭 스타일과 사용 예시들을 확인해보세요
          </p>
        </div>

        {/* Basic Tabs */}
        <div className='rounded-xl bg-white p-8 shadow-sm'>
          <h2 className='mb-6 text-2xl font-semibold text-gray-900'>
            Basic Tabs
          </h2>
          <Tabs defaultValue='tab1'>
            <TabsList className='grid w-full grid-cols-3 rounded-lg bg-gray-100 p-1'>
              <TabsTrigger
                value='tab1'
                className='rounded-md px-3 py-2 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm'
              >
                Tab 1
              </TabsTrigger>
              <TabsTrigger
                value='tab2'
                className='rounded-md px-3 py-2 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm'
              >
                Tab 2
              </TabsTrigger>
              <TabsTrigger
                value='tab3'
                className='rounded-md px-3 py-2 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm'
              >
                Tab 3
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value='tab1'
              className='mt-4 rounded-lg bg-gray-50 p-4'
            >
              <h3 className='mb-2 text-lg font-semibold'>첫 번째 탭</h3>
              <p className='text-gray-600'>
                이것은 첫 번째 탭의 내용입니다. 여기에는 다양한 콘텐츠가 들어갈
                수 있습니다.
              </p>
            </TabsContent>
            <TabsContent
              value='tab2'
              className='mt-4 rounded-lg bg-gray-50 p-4'
            >
              <h3 className='mb-2 text-lg font-semibold'>두 번째 탭</h3>
              <p className='text-gray-600'>
                두 번째 탭의 내용입니다. 각 탭마다 다른 내용을 보여줄 수
                있습니다.
              </p>
            </TabsContent>
            <TabsContent
              value='tab3'
              className='mt-4 rounded-lg bg-gray-50 p-4'
            >
              <h3 className='mb-2 text-lg font-semibold'>세 번째 탭</h3>
              <p className='text-gray-600'>
                세 번째 탭의 내용입니다. 탭을 클릭하면 해당 내용이 표시됩니다.
              </p>
            </TabsContent>
          </Tabs>
        </div>
        <div>
          <Tabs defaultValue='tab1'>
            <TabsList>
              <TabsTrigger value='tab1'>Tab 1</TabsTrigger>
              <TabsTrigger value='tab2'>Tab 2</TabsTrigger>
              <TabsTrigger value='tab3'>Tab 3</TabsTrigger>
            </TabsList>
            <TabsContent value='tab1'>Tab 1</TabsContent>
            <TabsContent value='tab2'>Tab 2</TabsContent>
            <TabsContent value='tab3'>Tab 3</TabsContent>
          </Tabs>
        </div>

        {/* Styled Tabs */}
        <div className='rounded-xl bg-white p-8 shadow-sm'>
          <h2 className='mb-6 text-2xl font-semibold text-gray-900'>
            Styled Tabs
          </h2>
          <Tabs defaultValue='overview'>
            <TabsList className='inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500'>
              <TabsTrigger
                value='overview'
                className='inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium whitespace-nowrap ring-offset-white transition-all focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-gray-950 data-[state=active]:shadow-sm'
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value='analytics'
                className='inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium whitespace-nowrap ring-offset-white transition-all focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-gray-950 data-[state=active]:shadow-sm'
              >
                Analytics
              </TabsTrigger>
              <TabsTrigger
                value='reports'
                className='inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium whitespace-nowrap ring-offset-white transition-all focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-gray-950 data-[state=active]:shadow-sm'
              >
                Reports
              </TabsTrigger>
              <TabsTrigger
                value='notifications'
                className='inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium whitespace-nowrap ring-offset-white transition-all focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-gray-950 data-[state=active]:shadow-sm'
              >
                Notifications
              </TabsTrigger>
            </TabsList>
            <TabsContent value='overview' className='mt-4 space-y-4'>
              <div className='rounded-lg border p-4'>
                <h3 className='mb-2 text-lg font-semibold'>개요</h3>
                <p className='mb-4 text-gray-600'>
                  전체 시스템의 상태와 주요 지표를 확인할 수 있습니다.
                </p>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                  <div className='rounded-lg bg-blue-50 p-4'>
                    <h4 className='font-medium text-blue-900'>총 사용자</h4>
                    <p className='text-2xl font-bold text-blue-600'>1,234</p>
                  </div>
                  <div className='rounded-lg bg-green-50 p-4'>
                    <h4 className='font-medium text-green-900'>활성 세션</h4>
                    <p className='text-2xl font-bold text-green-600'>567</p>
                  </div>
                  <div className='rounded-lg bg-purple-50 p-4'>
                    <h4 className='font-medium text-purple-900'>전환율</h4>
                    <p className='text-2xl font-bold text-purple-600'>12.3%</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value='analytics' className='mt-4 space-y-4'>
              <div className='rounded-lg border p-4'>
                <h3 className='mb-2 text-lg font-semibold'>분석</h3>
                <p className='mb-4 text-gray-600'>
                  상세한 분석 데이터와 트렌드를 확인할 수 있습니다.
                </p>
                <div className='rounded-lg bg-gray-50 p-4'>
                  <p className='text-sm text-gray-500'>📊 차트 영역</p>
                  <div className='mt-2 flex h-32 items-center justify-center rounded-lg bg-gray-200'>
                    <span className='text-gray-400'>
                      Analytics Chart Placeholder
                    </span>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value='reports' className='mt-4 space-y-4'>
              <div className='rounded-lg border p-4'>
                <h3 className='mb-2 text-lg font-semibold'>보고서</h3>
                <p className='mb-4 text-gray-600'>
                  다양한 보고서를 생성하고 다운로드할 수 있습니다.
                </p>
                <div className='space-y-2'>
                  <div className='flex items-center justify-between rounded-lg bg-gray-50 p-3'>
                    <span className='font-medium'>월간 사용자 보고서</span>
                    <button className='text-blue-600 hover:text-blue-800'>
                      다운로드
                    </button>
                  </div>
                  <div className='flex items-center justify-between rounded-lg bg-gray-50 p-3'>
                    <span className='font-medium'>수익 분석 보고서</span>
                    <button className='text-blue-600 hover:text-blue-800'>
                      다운로드
                    </button>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value='notifications' className='mt-4 space-y-4'>
              <div className='rounded-lg border p-4'>
                <h3 className='mb-2 text-lg font-semibold'>알림</h3>
                <p className='mb-4 text-gray-600'>
                  시스템 알림과 사용자 알림을 관리할 수 있습니다.
                </p>
                <div className='space-y-2'>
                  <div className='flex items-center rounded-lg bg-yellow-50 p-3'>
                    <span className='mr-2 text-yellow-600'>⚠️</span>
                    <span className='font-medium'>시스템 점검 예정</span>
                  </div>
                  <div className='flex items-center rounded-lg bg-blue-50 p-3'>
                    <span className='mr-2 text-blue-600'>ℹ️</span>
                    <span className='font-medium'>
                      새로운 기능이 추가되었습니다
                    </span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Controlled Tabs */}
        <div className='rounded-xl bg-white p-8 shadow-sm'>
          <h2 className='mb-6 text-2xl font-semibold text-gray-900'>
            Controlled Tabs (요금제 선택)
          </h2>
          <Tabs value={selectedPlan} onValueChange={setSelectedPlan}>
            <TabsList className='grid w-full grid-cols-3 rounded-lg bg-gray-100 p-1'>
              <TabsTrigger
                value='basic'
                className='rounded-md px-3 py-2 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm'
              >
                Basic
              </TabsTrigger>
              <TabsTrigger
                value='pro'
                className='rounded-md px-3 py-2 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm'
              >
                Pro
              </TabsTrigger>
              <TabsTrigger
                value='enterprise'
                className='rounded-md px-3 py-2 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm'
              >
                Enterprise
              </TabsTrigger>
            </TabsList>
            <TabsContent value='basic' className='mt-4'>
              <div className='rounded-lg border p-6'>
                <div className='mb-4 text-center'>
                  <h3 className='text-2xl font-bold'>Basic Plan</h3>
                  <p className='mt-2 text-3xl font-bold text-blue-600'>
                    ₩9,900
                    <span className='text-lg font-normal text-gray-500'>
                      /월
                    </span>
                  </p>
                </div>
                <ul className='mb-6 space-y-2'>
                  <li className='flex items-center'>
                    <span className='mr-2 text-green-500'>✓</span>
                    기본 기능 이용
                  </li>
                  <li className='flex items-center'>
                    <span className='mr-2 text-green-500'>✓</span>월 100회 API
                    호출
                  </li>
                  <li className='flex items-center'>
                    <span className='mr-2 text-green-500'>✓</span>
                    이메일 지원
                  </li>
                </ul>
                <button className='w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700'>
                  Basic 플랜 선택
                </button>
              </div>
            </TabsContent>
            <TabsContent value='pro' className='mt-4'>
              <div className='relative rounded-lg border-2 border-blue-500 p-6'>
                <div className='absolute -top-3 left-1/2 -translate-x-1/2 transform'>
                  <span className='rounded-full bg-blue-500 px-3 py-1 text-sm text-white'>
                    인기
                  </span>
                </div>
                <div className='mb-4 text-center'>
                  <h3 className='text-2xl font-bold'>Pro Plan</h3>
                  <p className='mt-2 text-3xl font-bold text-blue-600'>
                    ₩29,900
                    <span className='text-lg font-normal text-gray-500'>
                      /월
                    </span>
                  </p>
                </div>
                <ul className='mb-6 space-y-2'>
                  <li className='flex items-center'>
                    <span className='mr-2 text-green-500'>✓</span>
                    모든 기본 기능
                  </li>
                  <li className='flex items-center'>
                    <span className='mr-2 text-green-500'>✓</span>월 1,000회 API
                    호출
                  </li>
                  <li className='flex items-center'>
                    <span className='mr-2 text-green-500'>✓</span>
                    우선 지원
                  </li>
                  <li className='flex items-center'>
                    <span className='mr-2 text-green-500'>✓</span>
                    고급 분석 도구
                  </li>
                </ul>
                <button className='w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700'>
                  Pro 플랜 선택
                </button>
              </div>
            </TabsContent>
            <TabsContent value='enterprise' className='mt-4'>
              <div className='rounded-lg border p-6'>
                <div className='mb-4 text-center'>
                  <h3 className='text-2xl font-bold'>Enterprise Plan</h3>
                  <p className='mt-2 text-3xl font-bold text-blue-600'>
                    맞춤 견적
                  </p>
                </div>
                <ul className='mb-6 space-y-2'>
                  <li className='flex items-center'>
                    <span className='mr-2 text-green-500'>✓</span>
                    모든 Pro 기능
                  </li>
                  <li className='flex items-center'>
                    <span className='mr-2 text-green-500'>✓</span>
                    무제한 API 호출
                  </li>
                  <li className='flex items-center'>
                    <span className='mr-2 text-green-500'>✓</span>
                    전용 계정 관리자
                  </li>
                  <li className='flex items-center'>
                    <span className='mr-2 text-green-500'>✓</span>
                    맞춤형 통합 지원
                  </li>
                  <li className='flex items-center'>
                    <span className='mr-2 text-green-500'>✓</span>
                    SLA 보장
                  </li>
                </ul>
                <button className='w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700'>
                  문의하기
                </button>
              </div>
            </TabsContent>
          </Tabs>
          <div className='mt-4 rounded-lg bg-blue-50 p-4'>
            <p className='text-sm text-blue-600'>
              현재 선택된 플랜:{' '}
              <span className='font-medium'>{selectedPlan}</span>
            </p>
          </div>
        </div>

        {/* Vertical Tabs */}
        <div className='rounded-xl bg-white p-8 shadow-sm'>
          <h2 className='mb-6 text-2xl font-semibold text-gray-900'>
            Vertical Layout Example
          </h2>
          <Tabs defaultValue='profile'>
            <div className='flex gap-6'>
              <TabsList className='flex h-fit flex-col rounded-lg bg-gray-100 p-1'>
                <TabsTrigger
                  value='profile'
                  className='w-full justify-start rounded-md px-3 py-2 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm'
                >
                  프로필
                </TabsTrigger>
                <TabsTrigger
                  value='account'
                  className='w-full justify-start rounded-md px-3 py-2 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm'
                >
                  계정
                </TabsTrigger>
                <TabsTrigger
                  value='password'
                  className='w-full justify-start rounded-md px-3 py-2 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm'
                >
                  비밀번호
                </TabsTrigger>
                <TabsTrigger
                  value='notifications'
                  className='w-full justify-start rounded-md px-3 py-2 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm'
                >
                  알림
                </TabsTrigger>
              </TabsList>
              <div className='flex-1'>
                <TabsContent
                  value='profile'
                  className='mt-0 rounded-lg bg-gray-50 p-4'
                >
                  <h3 className='mb-4 text-lg font-semibold'>프로필 설정</h3>
                  <div className='space-y-4'>
                    <div>
                      <label className='mb-1 block text-sm font-medium'>
                        이름
                      </label>
                      <input
                        className='w-full rounded-md border p-2'
                        defaultValue='홍길동'
                      />
                    </div>
                    <div>
                      <label className='mb-1 block text-sm font-medium'>
                        소개
                      </label>
                      <textarea
                        className='w-full rounded-md border p-2'
                        rows={3}
                        defaultValue='안녕하세요!'
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent
                  value='account'
                  className='mt-0 rounded-lg bg-gray-50 p-4'
                >
                  <h3 className='mb-4 text-lg font-semibold'>계정 설정</h3>
                  <div className='space-y-4'>
                    <div>
                      <label className='mb-1 block text-sm font-medium'>
                        이메일
                      </label>
                      <input
                        className='w-full rounded-md border p-2'
                        defaultValue='user@example.com'
                      />
                    </div>
                    <div>
                      <label className='mb-1 block text-sm font-medium'>
                        전화번호
                      </label>
                      <input
                        className='w-full rounded-md border p-2'
                        defaultValue='010-1234-5678'
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent
                  value='password'
                  className='mt-0 rounded-lg bg-gray-50 p-4'
                >
                  <h3 className='mb-4 text-lg font-semibold'>비밀번호 변경</h3>
                  <div className='space-y-4'>
                    <div>
                      <label className='mb-1 block text-sm font-medium'>
                        현재 비밀번호
                      </label>
                      <input
                        type='password'
                        className='w-full rounded-md border p-2'
                      />
                    </div>
                    <div>
                      <label className='mb-1 block text-sm font-medium'>
                        새 비밀번호
                      </label>
                      <input
                        type='password'
                        className='w-full rounded-md border p-2'
                      />
                    </div>
                    <div>
                      <label className='mb-1 block text-sm font-medium'>
                        비밀번호 확인
                      </label>
                      <input
                        type='password'
                        className='w-full rounded-md border p-2'
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent
                  value='notifications'
                  className='mt-0 rounded-lg bg-gray-50 p-4'
                >
                  <h3 className='mb-4 text-lg font-semibold'>알림 설정</h3>
                  <div className='space-y-4'>
                    <div className='flex items-center justify-between'>
                      <span>이메일 알림</span>
                      <input
                        type='checkbox'
                        className='h-4 w-4'
                        defaultChecked
                      />
                    </div>
                    <div className='flex items-center justify-between'>
                      <span>SMS 알림</span>
                      <input type='checkbox' className='h-4 w-4' />
                    </div>
                    <div className='flex items-center justify-between'>
                      <span>푸시 알림</span>
                      <input
                        type='checkbox'
                        className='h-4 w-4'
                        defaultChecked
                      />
                    </div>
                  </div>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
