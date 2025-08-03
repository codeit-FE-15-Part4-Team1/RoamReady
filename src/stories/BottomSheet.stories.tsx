import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

import Button from '@/shared/components/Button';
import { BottomSheet } from '@/shared/components/ui/bottom-sheet';

const meta: Meta<typeof BottomSheet.Root> = {
  title: 'Components/BottomSheet',
  component: BottomSheet.Root,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BottomSheet.Root>;

export const Basic: Story = {
  render: () => {
    return (
      <div className='flex flex-col gap-20'>
        <div className='flex flex-col'>
          <h2 className='font-size-20 font-bold'>1. 비제어 바텀시트</h2>
          <p className='font-size-18 text-gray-800'>
            가장 기본적인 바텀시트입니다. 외부 상태 관리 필요 없이 컴포넌트만
            구성해서 사용합니다.
          </p>
          <div className='mt-20 flex flex-1 gap-40'>
            <BottomSheet.Root>
              <BottomSheet.Trigger>
                <Button variant='primary' className='font-size-20'>
                  OPEN
                </Button>
              </BottomSheet.Trigger>
              <BottomSheet.Content>
                <BottomSheet.Header>
                  <span>BottomSheet 헤더</span>
                </BottomSheet.Header>
                <p>BottomSheet 컨텐츠</p>
                <p>BottomSheet 컨텐츠</p>
                <p>BottomSheet 컨텐츠</p>
                <BottomSheet.Footer>
                  <Button variant='primary' size='large'>
                    확인
                  </Button>
                </BottomSheet.Footer>
              </BottomSheet.Content>
            </BottomSheet.Root>
          </div>
        </div>
      </div>
    );
  },
};

export const ControlledBottomSheet: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className='flex flex-col'>
        <h2 className='font-size-20 font-bold'>2. 제어 바텀시트</h2>
        <p className='font-size-18 text-gray-800'>
          <code className='rounded-lg bg-gray-100 px-6 py-2 font-semibold text-gray-800'>
            DropdownMenu.Item
          </code>{' '}
          등으로 BottomSheet를 트리거링 해야하는 경우, 외부에서 상태 값을 따로
          만들어 BottomSheet를 사용할 수 있습니다.
          <br />
          1.{' '}
          <code className='rounded-lg bg-gray-100 px-6 py-2 font-semibold text-gray-800'>
            useState
          </code>
          를 사용해 BottomSheet의 열림/닫힘을 관리하는 상태를 만들어줍니다.
          <br />
          2.{' '}
          <code className='rounded-lg bg-gray-100 px-6 py-2 font-semibold text-gray-800'>
            BottomSheet.Root
          </code>
          에{' '}
          <code className='rounded-lg bg-gray-100 px-6 py-2 font-semibold text-gray-800'>
            open
          </code>
          ,{' '}
          <code className='rounded-lg bg-gray-100 px-6 py-2 font-semibold text-gray-800'>
            onOpenChange
          </code>{' '}
          속성을 추가하고, 상태와 상태 변경 함수를 전달합니다.
          <br />
        </p>
        <div className='mt-20 flex flex-1 gap-40'>
          <Button
            variant='primary'
            className='font-size-20'
            onClick={() => setIsOpen(true)}
          >
            OPEN
          </Button>
          <BottomSheet.Root open={isOpen} onOpenChange={setIsOpen}>
            <BottomSheet.Content>
              <BottomSheet.Header>
                <span>BottomSheet 헤더</span>
              </BottomSheet.Header>
              <p>BottomSheet 컨텐츠</p>
              <p>BottomSheet 컨텐츠</p>
              <p>BottomSheet 컨텐츠</p>
              <BottomSheet.Footer>
                <Button variant='primary' size='large'>
                  확인
                </Button>
              </BottomSheet.Footer>
            </BottomSheet.Content>
          </BottomSheet.Root>
        </div>
      </div>
    );
  },
};

export const MultiStepBottomSheet: Story = {
  render: () => {
    return (
      <div className='flex flex-col'>
        <h2 className='font-size-20 font-bold'>3. 다중 스텝 바텀시트</h2>
        <p className='font-size-18 text-gray-800'>
          모바일 환경에서 BottomSheet를 여러 스텝으로 구성해야 하는 경우 다음과
          같이 사용합니다.
          <br />
          1.{' '}
          <code className='rounded-lg bg-gray-100 px-6 py-2 font-semibold text-gray-800'>
            BottomSheet.Content
          </code>
          에 <code>hasMultiStep</code> 속성을 추가합니다.
          <br />
          2.{' '}
          <code className='rounded-lg bg-gray-100 px-6 py-2 font-semibold text-gray-800'>
            BottomSheet.Content
          </code>{' '}
          내부에서 각 스텝을 구성하는{' '}
          <code className='rounded-lg bg-gray-100 px-6 py-2 font-semibold text-gray-800'>
            BottomSheet.Step
          </code>
          을 사용하여 스텝을 구성합니다.
        </p>
        <div className='mt-20 flex flex-1 gap-40'>
          <BottomSheet.Root>
            <BottomSheet.Trigger>
              <Button variant='primary' className='font-size-20'>
                OPEN
              </Button>
            </BottomSheet.Trigger>
            <BottomSheet.Content hasMultiStep>
              <BottomSheet.Step>
                <BottomSheet.Header>
                  <span>BottomSheet 헤더 1</span>
                </BottomSheet.Header>
                <p>BottomSheet 컨텐츠</p>
                <p>BottomSheet 컨텐츠</p>
                <p>BottomSheet 컨텐츠</p>
                <BottomSheet.Footer>
                  <Button variant='primary' size='large'>
                    확인
                  </Button>
                </BottomSheet.Footer>
              </BottomSheet.Step>
              <BottomSheet.Step>
                <BottomSheet.Header>
                  <span>BottomSheet 헤더 2</span>
                </BottomSheet.Header>
                <p>BottomSheet 컨텐츠</p>
                <p>BottomSheet 컨텐츠</p>
                <p>BottomSheet 컨텐츠</p>
                <BottomSheet.Footer>
                  <Button variant='primary' size='large'>
                    확인
                  </Button>
                </BottomSheet.Footer>
              </BottomSheet.Step>
              <BottomSheet.Step>
                <BottomSheet.Header>
                  <span>BottomSheet 헤더 3</span>
                </BottomSheet.Header>
                <p>BottomSheet 컨텐츠</p>
                <p>BottomSheet 컨텐츠</p>
                <p>BottomSheet 컨텐츠</p>
                <BottomSheet.Footer>
                  <Button variant='primary' size='large'>
                    확인
                  </Button>
                </BottomSheet.Footer>
              </BottomSheet.Step>
              <BottomSheet.Step>
                <BottomSheet.Header>
                  <span>BottomSheet 헤더 4</span>
                </BottomSheet.Header>
                <p>BottomSheet 컨텐츠</p>
                <p>BottomSheet 컨텐츠</p>
                <p>BottomSheet 컨텐츠</p>
                <BottomSheet.Footer>
                  <Button variant='primary' size='large'>
                    확인
                  </Button>
                </BottomSheet.Footer>
              </BottomSheet.Step>
              <BottomSheet.Step>
                <BottomSheet.Header>
                  <span>BottomSheet 헤더 5</span>
                </BottomSheet.Header>
                <p>BottomSheet 컨텐츠</p>
                <p>BottomSheet 컨텐츠</p>
                <p>BottomSheet 컨텐츠</p>
                <BottomSheet.Footer>
                  <Button variant='primary' size='large'>
                    닫기
                  </Button>
                </BottomSheet.Footer>
              </BottomSheet.Step>
            </BottomSheet.Content>
          </BottomSheet.Root>
        </div>
      </div>
    );
  },
};
