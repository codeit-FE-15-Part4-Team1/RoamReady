'use client';

import { useState } from 'react';

import Select from '@/shared/components/ui/select';

export default function SelectTestPage() {
  const [basicValue, setBasicValue] = useState('');
  const [categoryValue, setCategoryValue] = useState('');
  const [disabledValue, setDisabledValue] = useState('option1');
  const [multiSelectValue1, setMultiSelectValue1] = useState('');
  const [multiSelectValue2, setMultiSelectValue2] = useState('');
  const [customValue, setCustomValue] = useState('');

  return (
    <div className='container mx-auto max-w-4xl p-8'>
      <h1 className='mb-8 text-3xl font-bold'>Select 컴포넌트 테스트</h1>

      <div className='space-y-12'>
        {/* 기본 Select */}
        <section>
          <h2 className='mb-4 text-2xl font-semibold'>기본 Select</h2>
          <div className='space-y-4'>
            <div>
              <label className='mb-2 block text-sm font-medium'>
                기본 셀렉트 (선택된 값: {basicValue || '없음'})
              </label>
              <Select.Root value={basicValue} onValueChange={setBasicValue}>
                <Select.Trigger className='w-full max-w-md'>
                  <Select.Value placeholder='옵션을 선택하세요' />
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value='option1'>옵션 1</Select.Item>
                  <Select.Item value='option2'>옵션 2</Select.Item>
                  <Select.Item value='option3'>옵션 3</Select.Item>
                </Select.Content>
              </Select.Root>
            </div>
          </div>
        </section>

        {/* 카테고리 Select */}
        <section>
          <h2 className='mb-4 text-2xl font-semibold'>카테고리 Select</h2>
          <div className='space-y-4'>
            <div>
              <label className='mb-2 block text-sm font-medium'>
                카테고리 선택 (선택된 값: {categoryValue || '없음'})
              </label>
              <Select.Root
                value={categoryValue}
                onValueChange={setCategoryValue}
              >
                <Select.Trigger className='w-full max-w-md'>
                  <Select.Value placeholder='카테고리를 선택하세요' />
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value='여행'>🧳 여행</Select.Item>
                  <Select.Item value='음식'>🍽️ 음식</Select.Item>
                  <Select.Item value='문화'>🎭 문화</Select.Item>
                  <Select.Item value='스포츠'>⚽ 스포츠</Select.Item>
                  <Select.Item value='엔터테인먼트'>
                    🎬 엔터테인먼트
                  </Select.Item>
                  <Select.Item value='education'>📚 교육</Select.Item>
                </Select.Content>
              </Select.Root>
            </div>
          </div>
        </section>

        {/* 비활성화된 Select */}
        <section>
          <h2 className='mb-4 text-2xl font-semibold'>비활성화된 Select</h2>
          <div className='space-y-4'>
            <div>
              <label className='mb-2 block text-sm font-medium'>
                비활성화된 셀렉트 (값: {disabledValue})
              </label>
              <Select.Root
                value={disabledValue}
                onValueChange={setDisabledValue}
                disabled
              >
                <Select.Trigger className='w-full max-w-md'>
                  <Select.Value placeholder='비활성화됨' />
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value='option1'>옵션 1</Select.Item>
                  <Select.Item value='option2'>옵션 2</Select.Item>
                  <Select.Item value='option3'>옵션 3</Select.Item>
                </Select.Content>
              </Select.Root>
            </div>
          </div>
        </section>

        {/* 다중 Select 조합 */}
        <section>
          <h2 className='mb-4 text-2xl font-semibold'>다중 Select 조합</h2>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div>
              <label className='mb-2 block text-sm font-medium'>
                지역 선택 (선택된 값: {multiSelectValue1 || '없음'})
              </label>
              <Select.Root
                value={multiSelectValue1}
                onValueChange={setMultiSelectValue1}
              >
                <Select.Trigger>
                  <Select.Value placeholder='지역을 선택하세요' />
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value='서울'>서울</Select.Item>
                  <Select.Item value='부산'>부산</Select.Item>
                  <Select.Item value='대구'>대구</Select.Item>
                  <Select.Item value='인천'>인천</Select.Item>
                  <Select.Item value='광주'>광주</Select.Item>
                  <Select.Item value='대전'>대전</Select.Item>
                  <Select.Item value='울산'>울산</Select.Item>
                </Select.Content>
              </Select.Root>
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium'>
                언어 선택 (선택된 값: {multiSelectValue2 || '없음'})
              </label>
              <Select.Root
                value={multiSelectValue2}
                onValueChange={setMultiSelectValue2}
              >
                <Select.Trigger>
                  <Select.Value placeholder='언어를 선택하세요' />
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value='한국어'>한국어</Select.Item>
                  <Select.Item value='English'>English</Select.Item>
                  <Select.Item value='日本語'>日本語</Select.Item>
                  <Select.Item value='中文'>中文</Select.Item>
                  <Select.Item value='Español'>Español</Select.Item>
                  <Select.Item value='Français'>Français</Select.Item>
                </Select.Content>
              </Select.Root>
            </div>
          </div>
        </section>

        {/* 스타일링 테스트 */}
        <section>
          <h2 className='mb-4 text-2xl font-semibold'>스타일링 테스트</h2>
          <div className='space-y-4'>
            <div>
              <label className='mb-2 block text-sm font-medium'>
                커스텀 스타일링 (선택된 값: {customValue || '없음'})
              </label>
              <Select.Root value={customValue} onValueChange={setCustomValue}>
                <Select.Trigger className='w-full max-w-md border-blue-200 bg-blue-50 hover:border-blue-300'>
                  <Select.Value placeholder='커스텀 스타일 적용' />
                </Select.Trigger>
                <Select.Content className='bg-blue-50'>
                  <Select.Item
                    value='커스텀 옵션 1'
                    className='hover:bg-blue-100'
                  >
                    커스텀 옵션 1
                  </Select.Item>
                  <Select.Item
                    value='커스텀 옵션 2'
                    className='hover:bg-blue-100'
                  >
                    커스텀 옵션 2
                  </Select.Item>
                  <Select.Item
                    value='커스텀 옵션 3'
                    className='hover:bg-blue-100'
                  >
                    커스텀 옵션 3
                  </Select.Item>
                </Select.Content>
              </Select.Root>
            </div>
          </div>
        </section>

        {/* 선택된 값들 요약 */}
        <section>
          <h2 className='mb-4 text-2xl font-semibold'>선택된 값들 요약</h2>
          <div className='rounded-lg bg-gray-50 p-6'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div>
                <strong>기본 셀렉트:</strong> {basicValue || '선택 안됨'}
              </div>
              <div>
                <strong>카테고리:</strong> {categoryValue || '선택 안됨'}
              </div>
              <div>
                <strong>비활성화된 셀렉트:</strong> {disabledValue}
              </div>
              <div>
                <strong>지역:</strong> {multiSelectValue1 || '선택 안됨'}
              </div>
              <div>
                <strong>언어:</strong> {multiSelectValue2 || '선택 안됨'}
              </div>
              <div>
                <strong>커스텀 스타일링:</strong> {customValue || '선택 안됨'}
              </div>
            </div>
          </div>
        </section>

        {/* 리셋 버튼 */}
        <section>
          <button
            onClick={() => {
              setBasicValue('');
              setCategoryValue('');
              setMultiSelectValue1('');
              setMultiSelectValue2('');
              setCustomValue('');
            }}
            className='rounded-lg bg-red-500 px-6 py-3 text-white transition-colors hover:bg-red-600'
          >
            모든 선택 초기화
          </button>
        </section>
      </div>
    </div>
  );
}
