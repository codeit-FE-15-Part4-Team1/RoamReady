'use client';

import Popover from '@/shared/components/ui/popover';

export default function PopoverTestPage() {
  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className='mx-auto max-w-5xl space-y-8'>
        <div className='text-center'>
          <h1 className='mb-2 text-4xl font-bold text-gray-900'>
            Popover Position 테스트
          </h1>
          <p className='text-gray-600'>
            12가지 position으로 popover가 제대로 위치하는지 테스트해보세요
          </p>
        </div>

        {/* Position 12가지 테스트 */}
        <section className='rounded-xl bg-white p-8 shadow-sm'>
          <h2 className='mb-6 text-2xl font-semibold text-gray-900'>
            12가지 Position 테스트
          </h2>

          {/* Bottom 3가지 */}
          <div className='mb-8'>
            <h3 className='mb-4 text-lg font-medium text-gray-700'>
              Bottom 위치
            </h3>
            <div className='flex flex-wrap gap-4'>
              <Popover.Root>
                <Popover.Trigger className='rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'>
                  bottom-start
                </Popover.Trigger>
                <Popover.Content position='bottom-start'>
                  <p>bottom-start: 아래쪽, 왼쪽 끝 정렬</p>
                </Popover.Content>
              </Popover.Root>

              <Popover.Root>
                <Popover.Trigger className='rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'>
                  bottom-center
                </Popover.Trigger>
                <Popover.Content position='bottom-center'>
                  <p>bottom-center: 아래쪽, 중앙 정렬</p>
                </Popover.Content>
              </Popover.Root>

              <Popover.Root>
                <Popover.Trigger className='rounded-lg bg-blue-700 px-4 py-2 text-white hover:bg-blue-800'>
                  bottom-end
                </Popover.Trigger>
                <Popover.Content position='bottom-end'>
                  <p>bottom-end: 아래쪽, 오른쪽 끝 정렬</p>
                </Popover.Content>
              </Popover.Root>
            </div>
          </div>

          {/* Top 3가지 */}
          <div className='mb-8'>
            <h3 className='mb-4 text-lg font-medium text-gray-700'>Top 위치</h3>
            <div className='flex flex-wrap gap-4'>
              <Popover.Root>
                <Popover.Trigger className='rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600'>
                  top-start
                </Popover.Trigger>
                <Popover.Content position='top-start'>
                  <p>top-start: 위쪽, 왼쪽 끝 정렬</p>
                </Popover.Content>
              </Popover.Root>

              <Popover.Root>
                <Popover.Trigger className='rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700'>
                  top-center
                </Popover.Trigger>
                <Popover.Content position='top-center'>
                  <p>top-center: 위쪽, 중앙 정렬</p>
                </Popover.Content>
              </Popover.Root>

              <Popover.Root>
                <Popover.Trigger className='rounded-lg bg-green-700 px-4 py-2 text-white hover:bg-green-800'>
                  top-end
                </Popover.Trigger>
                <Popover.Content position='top-end'>
                  <p>top-end: 위쪽, 오른쪽 끝 정렬</p>
                </Popover.Content>
              </Popover.Root>
            </div>
          </div>

          {/* Left & Right */}
          <div className='grid grid-cols-2 gap-8'>
            {/* Left 3가지 */}
            <div>
              <h3 className='mb-4 text-lg font-medium text-gray-700'>
                Left 위치
              </h3>
              <div className='space-y-4'>
                <Popover.Root>
                  <Popover.Trigger className='w-full rounded-lg bg-purple-500 px-4 py-2 text-white hover:bg-purple-600'>
                    left-start
                  </Popover.Trigger>
                  <Popover.Content position='left-start'>
                    <p>left-start: 왼쪽, 위쪽 끝 정렬</p>
                  </Popover.Content>
                </Popover.Root>

                <Popover.Root>
                  <Popover.Trigger className='w-full rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700'>
                    left-center
                  </Popover.Trigger>
                  <Popover.Content position='left-center'>
                    <p>left-center: 왼쪽, 중앙 정렬</p>
                  </Popover.Content>
                </Popover.Root>

                <Popover.Root>
                  <Popover.Trigger className='w-full rounded-lg bg-purple-700 px-4 py-2 text-white hover:bg-purple-800'>
                    left-end
                  </Popover.Trigger>
                  <Popover.Content position='left-end'>
                    <p>left-end: 왼쪽, 아래쪽 끝 정렬</p>
                  </Popover.Content>
                </Popover.Root>
              </div>
            </div>

            {/* Right 3가지 */}
            <div>
              <h3 className='mb-4 text-lg font-medium text-gray-700'>
                Right 위치
              </h3>
              <div className='space-y-4'>
                <Popover.Root>
                  <Popover.Trigger className='w-full rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600'>
                    right-start
                  </Popover.Trigger>
                  <Popover.Content position='right-start'>
                    <p>right-start: 오른쪽, 위쪽 끝 정렬</p>
                  </Popover.Content>
                </Popover.Root>

                <Popover.Root>
                  <Popover.Trigger className='w-full rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700'>
                    right-center
                  </Popover.Trigger>
                  <Popover.Content position='right-center'>
                    <p>right-center: 오른쪽, 중앙 정렬</p>
                  </Popover.Content>
                </Popover.Root>

                <Popover.Root>
                  <Popover.Trigger className='w-full rounded-lg bg-red-700 px-4 py-2 text-white hover:bg-red-800'>
                    right-end
                  </Popover.Trigger>
                  <Popover.Content position='right-end'>
                    <p>right-end: 오른쪽, 아래쪽 끝 정렬</p>
                  </Popover.Content>
                </Popover.Root>
              </div>
            </div>
          </div>
        </section>

        {/* 화면 여러 위치에서 테스트 */}
        <section className='rounded-xl bg-white p-8 shadow-sm'>
          <h2 className='mb-6 text-2xl font-semibold text-gray-900'>
            화면 여러 위치에서 테스트
          </h2>
          <div className='relative h-96 rounded-lg border-2 border-dashed border-gray-300'>
            {/* 좌상단 */}
            <div className='absolute top-4 left-4'>
              <Popover.Root>
                <Popover.Trigger className='rounded bg-orange-500 px-3 py-2 text-white'>
                  좌상단
                </Popover.Trigger>
                <Popover.Content position='bottom-start'>
                  좌상단에서 아래로
                </Popover.Content>
              </Popover.Root>
            </div>

            {/* 우상단 */}
            <div className='absolute top-4 right-4'>
              <Popover.Root>
                <Popover.Trigger className='rounded bg-pink-500 px-3 py-2 text-white'>
                  우상단
                </Popover.Trigger>
                <Popover.Content position='left-start'>
                  우상단에서 왼쪽으로
                </Popover.Content>
              </Popover.Root>
            </div>

            {/* 중앙 */}
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
              <Popover.Root>
                <Popover.Trigger className='rounded bg-indigo-500 px-3 py-2 text-white'>
                  중앙
                </Popover.Trigger>
                <Popover.Content position='bottom-center'>
                  중앙에서 아래로
                </Popover.Content>
              </Popover.Root>
            </div>

            {/* 좌하단 */}
            <div className='absolute bottom-4 left-4'>
              <Popover.Root>
                <Popover.Trigger className='rounded bg-teal-500 px-3 py-2 text-white'>
                  좌하단
                </Popover.Trigger>
                <Popover.Content position='top-start'>
                  좌하단에서 위로
                </Popover.Content>
              </Popover.Root>
            </div>

            {/* 우하단 */}
            <div className='absolute right-4 bottom-4'>
              <Popover.Root>
                <Popover.Trigger className='rounded bg-yellow-500 px-3 py-2 text-white'>
                  우하단
                </Popover.Trigger>
                <Popover.Content position='top-end'>
                  우하단에서 위로
                </Popover.Content>
              </Popover.Root>
            </div>
          </div>
        </section>

        {/* 복잡한 콘텐츠 테스트 */}
        <section className='rounded-xl bg-white p-8 shadow-sm'>
          <h2 className='mb-6 text-2xl font-semibold text-gray-900'>
            복잡한 콘텐츠 테스트
          </h2>
          <div className='flex flex-wrap gap-4'>
            {/* 폼이 있는 팝오버 */}
            <Popover.Root>
              <Popover.Trigger className='rounded-lg bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600'>
                폼 팝오버 (right-center)
              </Popover.Trigger>
              <Popover.Content position='right-center'>
                <div className='w-64 space-y-4'>
                  <h3 className='font-semibold'>사용자 정보</h3>
                  <div className='space-y-2'>
                    <input
                      type='text'
                      placeholder='이름'
                      className='w-full rounded border border-gray-300 px-3 py-2 text-sm'
                    />
                    <input
                      type='email'
                      placeholder='이메일'
                      className='w-full rounded border border-gray-300 px-3 py-2 text-sm'
                    />
                    <button className='w-full rounded bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600'>
                      저장
                    </button>
                  </div>
                </div>
              </Popover.Content>
            </Popover.Root>

            {/* 메뉴 팝오버 */}
            <Popover.Root>
              <Popover.Trigger className='rounded-lg bg-violet-500 px-4 py-2 text-white hover:bg-violet-600'>
                메뉴 팝오버 (bottom-center)
              </Popover.Trigger>
              <Popover.Content position='bottom-center'>
                <div className='w-48 space-y-1'>
                  <button className='w-full rounded px-3 py-2 text-left text-sm hover:bg-gray-100'>
                    프로필 보기
                  </button>
                  <button className='w-full rounded px-3 py-2 text-left text-sm hover:bg-gray-100'>
                    설정
                  </button>
                  <hr className='my-1' />
                  <button className='w-full rounded px-3 py-2 text-left text-sm text-red-600 hover:bg-gray-100'>
                    로그아웃
                  </button>
                </div>
              </Popover.Content>
            </Popover.Root>

            {/* 긴 콘텐츠 팝오버 */}
            <Popover.Root>
              <Popover.Trigger className='rounded-lg bg-cyan-500 px-4 py-2 text-white hover:bg-cyan-600'>
                긴 콘텐츠 (top-center)
              </Popover.Trigger>
              <Popover.Content position='top-center'>
                <div className='space-y-3'>
                  <h3 className='font-semibold'>긴 콘텐츠 테스트</h3>
                  <p className='text-sm text-gray-600'>
                    이것은 상당히 긴 콘텐츠입니다. Popover가 trigger 위쪽에
                    제대로 나타나는지 확인해보세요. 스크롤이 있는 페이지에서도
                    정확한 위치에 나타나야 합니다.
                  </p>
                  <div className='flex gap-2'>
                    <button className='rounded bg-blue-500 px-3 py-1 text-sm text-white'>
                      확인
                    </button>
                    <button className='rounded bg-gray-300 px-3 py-1 text-sm text-gray-700'>
                      취소
                    </button>
                  </div>
                </div>
              </Popover.Content>
            </Popover.Root>
          </div>
        </section>

        {/* 스크롤 테스트용 공간 */}
        <section className='rounded-xl bg-white p-8 shadow-sm'>
          <h2 className='mb-6 text-2xl font-semibold text-gray-900'>
            스크롤 테스트
          </h2>
          <div className='space-y-4'>
            <p className='text-gray-600'>
              페이지를 스크롤한 후 아래 버튼들을 테스트해보세요. 스크롤 위치와
              상관없이 정확한 위치에 나타나야 합니다.
            </p>
            <div className='flex gap-4'>
              <Popover.Root>
                <Popover.Trigger className='rounded-lg bg-rose-500 px-4 py-2 text-white hover:bg-rose-600'>
                  스크롤 테스트 1
                </Popover.Trigger>
                <Popover.Content position='bottom-center'>
                  스크롤 후에도 정확한 위치!
                </Popover.Content>
              </Popover.Root>

              <Popover.Root>
                <Popover.Trigger className='rounded-lg bg-amber-500 px-4 py-2 text-white hover:bg-amber-600'>
                  스크롤 테스트 2
                </Popover.Trigger>
                <Popover.Content position='top-center'>
                  위쪽으로도 정확하게!
                </Popover.Content>
              </Popover.Root>

              <Popover.Root>
                <Popover.Trigger className='rounded-lg bg-lime-500 px-4 py-2 text-white hover:bg-lime-600'>
                  스크롤 테스트 3
                </Popover.Trigger>
                <Popover.Content position='left-center'>
                  왼쪽으로도 정확하게!
                </Popover.Content>
              </Popover.Root>

              <Popover.Root>
                <Popover.Trigger className='rounded-lg bg-sky-500 px-4 py-2 text-white hover:bg-sky-600'>
                  스크롤 테스트 4
                </Popover.Trigger>
                <Popover.Content position='right-center'>
                  오른쪽으로도 정확하게!
                </Popover.Content>
              </Popover.Root>
            </div>
          </div>
        </section>

        {/* 스크롤 및 max-height 테스트 */}
        <section className='rounded-xl bg-white p-8 shadow-sm'>
          <h2 className='mb-6 text-2xl font-semibold text-gray-900'>
            스크롤 및 max-height 테스트
          </h2>
          <div className='space-y-4'>
            <p className='text-gray-600'>
              max-h-100 (400px) 설정으로 긴 콘텐츠가 스크롤되는지
              테스트해보세요.
            </p>
            <div className='flex gap-4'>
              {/* 매우 긴 콘텐츠 */}
              <Popover.Root>
                <Popover.Trigger className='rounded-lg bg-purple-500 px-4 py-2 text-white hover:bg-purple-600'>
                  매우 긴 콘텐츠 테스트
                </Popover.Trigger>
                <Popover.Content position='bottom-center'>
                  <div className='w-80 space-y-4'>
                    <h3 className='text-lg font-semibold'>매우 긴 콘텐츠</h3>
                    <p className='text-sm text-gray-600'>
                      이것은 popover의 max-height 제한을 테스트하기 위한 매우 긴
                      콘텐츠입니다.
                    </p>
                    <div className='space-y-2'>
                      <div className='rounded bg-gray-100 p-3'>
                        <h4 className='font-medium'>항목 1</h4>
                        <p className='text-sm text-gray-600'>
                          첫 번째 항목에 대한 설명입니다.
                        </p>
                      </div>
                      <div className='rounded bg-gray-100 p-3'>
                        <h4 className='font-medium'>항목 2</h4>
                        <p className='text-sm text-gray-600'>
                          두 번째 항목에 대한 설명입니다.
                        </p>
                      </div>
                      <div className='rounded bg-gray-100 p-3'>
                        <h4 className='font-medium'>항목 3</h4>
                        <p className='text-sm text-gray-600'>
                          세 번째 항목에 대한 설명입니다.
                        </p>
                      </div>
                      <div className='rounded bg-gray-100 p-3'>
                        <h4 className='font-medium'>항목 4</h4>
                        <p className='text-sm text-gray-600'>
                          네 번째 항목에 대한 설명입니다.
                        </p>
                      </div>
                      <div className='rounded bg-gray-100 p-3'>
                        <h4 className='font-medium'>항목 5</h4>
                        <p className='text-sm text-gray-600'>
                          다섯 번째 항목에 대한 설명입니다.
                        </p>
                      </div>
                      <div className='rounded bg-gray-100 p-3'>
                        <h4 className='font-medium'>항목 6</h4>
                        <p className='text-sm text-gray-600'>
                          여섯 번째 항목에 대한 설명입니다.
                        </p>
                      </div>
                      <div className='rounded bg-gray-100 p-3'>
                        <h4 className='font-medium'>항목 7</h4>
                        <p className='text-sm text-gray-600'>
                          일곱 번째 항목에 대한 설명입니다.
                        </p>
                      </div>
                      <div className='rounded bg-gray-100 p-3'>
                        <h4 className='font-medium'>항목 8</h4>
                        <p className='text-sm text-gray-600'>
                          여덟 번째 항목에 대한 설명입니다.
                        </p>
                      </div>
                      <div className='rounded bg-gray-100 p-3'>
                        <h4 className='font-medium'>항목 9</h4>
                        <p className='text-sm text-gray-600'>
                          아홉 번째 항목에 대한 설명입니다.
                        </p>
                      </div>
                      <div className='rounded bg-gray-100 p-3'>
                        <h4 className='font-medium'>항목 10</h4>
                        <p className='text-sm text-gray-600'>
                          열 번째 항목에 대한 설명입니다.
                        </p>
                      </div>
                    </div>
                    <div className='flex gap-2'>
                      <button className='rounded bg-blue-500 px-3 py-1 text-sm text-white'>
                        확인
                      </button>
                      <button className='rounded bg-gray-300 px-3 py-1 text-sm text-gray-700'>
                        취소
                      </button>
                    </div>
                  </div>
                </Popover.Content>
              </Popover.Root>

              {/* 긴 리스트 */}
              <Popover.Root>
                <Popover.Trigger className='rounded-lg bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600'>
                  긴 리스트 테스트
                </Popover.Trigger>
                <Popover.Content position='bottom-center'>
                  <div className='w-64 space-y-2'>
                    <h3 className='font-semibold'>사용자 목록</h3>
                    <div className='space-y-1'>
                      {Array.from({ length: 20 }, (_, i) => (
                        <div
                          key={i}
                          className='flex items-center justify-between rounded px-2 py-1 hover:bg-gray-50'
                        >
                          <span className='text-sm'>사용자 {i + 1}</span>
                          <button className='text-xs text-blue-500 hover:underline'>
                            선택
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </Popover.Content>
              </Popover.Root>

              {/* 스크롤 없는 적당한 크기 */}
              <Popover.Root>
                <Popover.Trigger className='rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600'>
                  적당한 크기 테스트
                </Popover.Trigger>
                <Popover.Content position='bottom-center'>
                  <div className='w-64 space-y-3'>
                    <h3 className='font-semibold'>적당한 크기</h3>
                    <p className='text-sm text-gray-600'>
                      이 콘텐츠는 max-height 제한에 걸리지 않아서 스크롤이
                      생기지 않습니다.
                    </p>
                    <div className='flex gap-2'>
                      <button className='rounded bg-blue-500 px-3 py-1 text-sm text-white'>
                        확인
                      </button>
                      <button className='rounded bg-gray-300 px-3 py-1 text-sm text-gray-700'>
                        취소
                      </button>
                    </div>
                  </div>
                </Popover.Content>
              </Popover.Root>
            </div>
          </div>
        </section>

        {/* 여백 (스크롤 테스트용) */}
        <div className='h-96'></div>
      </div>
    </div>
  );
}
