'use client';

import { useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

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
              <Select value={basicValue} onValueChange={setBasicValue}>
                <SelectTrigger className='w-full max-w-md'>
                  <SelectValue placeholder='옵션을 선택하세요' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='option1'>옵션 1</SelectItem>
                  <SelectItem value='option2'>옵션 2</SelectItem>
                  <SelectItem value='option3'>옵션 3</SelectItem>
                </SelectContent>
              </Select>
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
              <Select value={categoryValue} onValueChange={setCategoryValue}>
                <SelectTrigger className='w-full max-w-md'>
                  <SelectValue placeholder='카테고리를 선택하세요' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='여행'>🧳 여행</SelectItem>
                  <SelectItem value='음식'>🍽️ 음식</SelectItem>
                  <SelectItem value='문화'>🎭 문화</SelectItem>
                  <SelectItem value='스포츠'>⚽ 스포츠</SelectItem>
                  <SelectItem value='엔터테인먼트'>🎬 엔터테인먼트</SelectItem>
                  <SelectItem value='education'>📚 교육</SelectItem>
                </SelectContent>
              </Select>
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
              <Select
                value={disabledValue}
                onValueChange={setDisabledValue}
                disabled
              >
                <SelectTrigger className='w-full max-w-md'>
                  <SelectValue placeholder='비활성화됨' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='option1'>옵션 1</SelectItem>
                  <SelectItem value='option2'>옵션 2</SelectItem>
                  <SelectItem value='option3'>옵션 3</SelectItem>
                </SelectContent>
              </Select>
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
              <Select
                value={multiSelectValue1}
                onValueChange={setMultiSelectValue1}
              >
                <SelectTrigger>
                  <SelectValue placeholder='지역을 선택하세요' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='서울'>서울</SelectItem>
                  <SelectItem value='부산'>부산</SelectItem>
                  <SelectItem value='대구'>대구</SelectItem>
                  <SelectItem value='인천'>인천</SelectItem>
                  <SelectItem value='광주'>광주</SelectItem>
                  <SelectItem value='대전'>대전</SelectItem>
                  <SelectItem value='울산'>울산</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium'>
                언어 선택 (선택된 값: {multiSelectValue2 || '없음'})
              </label>
              <Select
                value={multiSelectValue2}
                onValueChange={setMultiSelectValue2}
              >
                <SelectTrigger>
                  <SelectValue placeholder='언어를 선택하세요' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='한국어'>한국어</SelectItem>
                  <SelectItem value='English'>English</SelectItem>
                  <SelectItem value='日本語'>日本語</SelectItem>
                  <SelectItem value='中文'>中文</SelectItem>
                  <SelectItem value='Español'>Español</SelectItem>
                  <SelectItem value='Français'>Français</SelectItem>
                </SelectContent>
              </Select>
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
              <Select value={customValue} onValueChange={setCustomValue}>
                <SelectTrigger className='w-full max-w-md border-blue-200 bg-blue-50 hover:border-blue-300'>
                  <SelectValue placeholder='커스텀 스타일 적용' />
                </SelectTrigger>
                <SelectContent className='bg-blue-50'>
                  <SelectItem
                    value='커스텀 옵션 1'
                    className='hover:bg-blue-100'
                  >
                    커스텀 옵션 1
                  </SelectItem>
                  <SelectItem
                    value='커스텀 옵션 2'
                    className='hover:bg-blue-100'
                  >
                    커스텀 옵션 2
                  </SelectItem>
                  <SelectItem
                    value='커스텀 옵션 3'
                    className='hover:bg-blue-100'
                  >
                    커스텀 옵션 3
                  </SelectItem>
                </SelectContent>
              </Select>
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
