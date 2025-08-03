import { Meta } from '@storybook/nextjs-vite';
import { SearchCheck } from 'lucide-react';
import Image from 'next/image';
import { FormProvider, useForm } from 'react-hook-form';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import Input from '@/shared/components/ui/input';
import { InputContext } from '@/shared/components/ui/input/InputContext';
import { useImagePreview } from '@/shared/hooks/useImagePreview';

interface FormValues {
  textExample: string;
  password: string;
  email: string;
  comment: string;
  profileImage?: FileList;
  searchExample: string;
  numberExample: number;
}

// FormProvider wrapper component for stories
const FormWrapper = ({
  children,
  defaultValues = {},
}: {
  children: React.ReactNode;
  defaultValues?: Partial<FormValues>;
}) => {
  const form = useForm<FormValues>({
    defaultValues: {
      textExample: '',
      password: '',
      email: '',
      comment: '',
      profileImage: undefined,
      searchExample: '',
      numberExample: 0,
      ...defaultValues,
    },
  });

  return <FormProvider {...form}>{children}</FormProvider>;
};

const meta = {
  title: 'UI/Input',
  component: Input.Root,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '다양한 타입의 입력 필드를 지원하는 복합 Input 컴포넌트입니다. Input.Root, Input.Label, Input.Field, Input.Helper, Input.Trigger 등의 하위 컴포넌트를 조합하여 사용합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: [
        'text',
        'password',
        'email',
        'textarea',
        'file',
        'search',
        'number',
      ],
      description: '입력 필드의 타입',
    },
    disabled: {
      control: 'boolean',
      description: '입력 필드 비활성화 여부',
    },
    required: {
      control: 'boolean',
      description: '필수 입력 여부',
    },
    maxLength: {
      control: 'number',
      description: '최대 입력 길이 (textarea에서 카운터 표시)',
    },
  },
} satisfies Meta<typeof Input.Root>;

export default meta;

type Story = {
  render: () => React.JSX.Element;
  parameters?: {
    docs?: {
      description?: {
        story?: string;
      };
    };
  };
};

// 기본 텍스트 입력
export const Default: Story = {
  render: () => (
    <FormWrapper>
      <Input.Root
        id='default-input'
        name='textExample'
        type='text'
        className='rounded-lg border border-gray-300 px-20 py-15'
      >
        <Input.Label>이름</Input.Label>
        <Input.Field placeholder='이름을 입력하세요' />
        <Input.Helper>안내 메시지</Input.Helper>
      </Input.Root>
    </FormWrapper>
  ),
};

// 비밀번호 입력
export const Password: Story = {
  render: () => (
    <FormWrapper>
      <Input.Root
        id='password-input'
        name='password'
        type='password'
        className='rounded-lg border border-gray-300 px-20 py-15'
      >
        <Input.Label>비밀번호</Input.Label>
        <Input.Field
          placeholder='비밀번호를 입력해주세요'
          rightIcon={<Input.Trigger triggerType='password-toggle' />}
        />
      </Input.Root>
    </FormWrapper>
  ),
};

// 에러 상태
export const WithError: Story = {
  render: () => (
    <InputContext.Provider
      value={{
        id: 'input-error-preview',
        name: 'previewError',
        type: 'text',
        isError: true,
        errors: {
          previewError: {
            message: '이메일 형식이 올바르지 않습니다.',
            type: 'manual',
          } satisfies FieldError,
        },
        register: {
          name: 'previewError',
          onBlur: () => {},
          onChange: () => {},
          ref: () => {},
        } as unknown as UseFormRegisterReturn,
        required: false,
        disabled: false,
        fileName: undefined,
        maxLength: undefined,
        currentLength: 0,
        fallbackMessage: '',
        isPasswordVisible: false,
        togglePasswordVisibility: () => {},
      }}
    >
      <div
        role='group'
        className='flex flex-col gap-10 rounded-lg border border-red-300 px-20 py-15'
      >
        <Input.Label>Email</Input.Label>
        <Input.Field placeholder='Email을 입력하세요' />
        <Input.Helper />
      </div>
    </InputContext.Provider>
  ),
  parameters: {
    docs: {
      description: {
        story: '유효성 검사 실패 시 표시되는 에러 상태입니다.',
      },
    },
  },
};

// Textarea
export const Textarea: Story = {
  render: () => (
    <FormWrapper>
      <Input.Root
        id='textarea-example'
        name='comment'
        type='textarea'
        className='rounded-lg border border-gray-300 px-20 py-15'
        required={true}
        maxLength={100}
      >
        <Input.Label>댓글</Input.Label>
        <Input.Field placeholder='댓글을 입력하세요' rows={4} />
        <Input.Helper />
      </Input.Root>
    </FormWrapper>
  ),
};

// 파일 업로드
export const FileUpload: Story = {
  render: () => {
    const FileUploadStory = () => {
      const form = useForm<FormValues>();
      const { previewUrl } = useImagePreview('profileImage', form.control);

      return (
        <FormProvider {...form}>
          <Input.Root
            id='file-example'
            type='file'
            name='profileImage'
            className='rounded-lg border border-gray-300 px-20 py-15'
          >
            <Input.Label>이미지</Input.Label>
            <Input.Trigger
              triggerType='file-upload'
              className='relative flex h-120 w-120 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300'
            >
              {previewUrl && (
                <Image
                  src={previewUrl}
                  alt='Image preview'
                  fill
                  className='object-cover'
                />
              )}
            </Input.Trigger>
            <Input.Field accept='image/*' />
            <Input.Helper />
          </Input.Root>
        </FormProvider>
      );
    };

    return <FileUploadStory />;
  },
  parameters: {
    docs: {
      description: {
        story:
          '이미지 파일 업로드 기능이 포함된 입력 필드입니다. 미리보기 기능을 제공합니다.',
      },
    },
  },
};

// 비활성화된 입력
export const Disabled: Story = {
  render: () => (
    <FormWrapper defaultValues={{ textExample: 'You cannot edit this' }}>
      <Input.Root
        id='disabled-example'
        name='textExample'
        type='text'
        className='rounded-lg border border-gray-300 px-20 py-15'
        disabled={true}
      >
        <Input.Label>비활성화</Input.Label>
        <Input.Field placeholder='You cannot edit this' />
      </Input.Root>
    </FormWrapper>
  ),
};

// 검색 입력
export const Search: Story = {
  render: () => (
    <FormWrapper>
      <Input.Root
        id='search-example'
        name='searchExample'
        type='search'
        className='rounded-lg border border-gray-300 px-20 py-15'
      >
        <Input.Label>검색</Input.Label>
        <Input.Field
          placeholder='검색어를 입력하세요'
          leftIcon={<SearchCheck size={24} />}
          className='pl-54'
        />
      </Input.Root>
    </FormWrapper>
  ),
};

// 숫자 입력
export const Number: Story = {
  render: () => (
    <FormWrapper>
      <Input.Root
        id='number-example'
        name='numberExample'
        type='number'
        className='rounded-lg border border-gray-300 px-20 py-15'
      >
        <Input.Label>숫자(가격)</Input.Label>
        <Input.Field placeholder='가격을 입력하세요' />
      </Input.Root>
    </FormWrapper>
  ),
};

// 반 너비
export const HalfWidth: Story = {
  render: () => (
    <FormWrapper>
      <Input.Root
        id='half-width-example'
        name='textExample'
        type='text'
        className='w-1/2 rounded-lg border border-gray-300 px-20 py-15'
      >
        <Input.Label>이름</Input.Label>
        <Input.Field placeholder='이름을 입력하세요' />
      </Input.Root>
    </FormWrapper>
  ),
};

// 필수 입력 필드
export const Required: Story = {
  render: () => (
    <FormWrapper>
      <Input.Root
        id='required-example'
        name='textExample'
        type='text'
        className='rounded-lg border border-gray-300 px-20 py-15'
        required={true}
      >
        <Input.Label>필수 입력</Input.Label>
        <Input.Field placeholder='필수 입력 필드입니다' />
        <Input.Helper>이 필드는 필수입니다</Input.Helper>
      </Input.Root>
    </FormWrapper>
  ),
};
