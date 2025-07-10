import React from 'react';

import { cn } from '../libs/cn';

// 직접 구현한 Button variant 시스템
const buttonVariants = {
  base: 'w-full border rounded-3xl flex items-center justify-center',
  variants: {
    default: 'bg-white text-black border border-black',
    outline: 'bg-transparent text-black border border-black',
    ghost: 'bg-gray-100 text-black hover:bg-gray-200',
    primary: 'bg-primary-500 text-white',
  },
};

// 버튼 클래스 반환 함수 variant, sizes 속성을 받아오기 위해 사용
function getButtonClasses(
  variant: keyof typeof buttonVariants.variants = 'default',
) {
  return cn(buttonVariants.base, buttonVariants.variants[variant]);
}

//버튼 컴포넌트의 속성을 받아오기 위서 extends 사용
interface ButtonProps extends React.ComponentProps<'button'> {
  asChild?: boolean;
  variant?: keyof typeof buttonVariants.variants;
}

export default function Button({
  asChild = false,
  variant = 'default',
  children,
  className,
  ...props
}: ButtonProps) {
  // asChild 속성이 존재하고 자식 요소가 유효한 react 요소인지 확인
  if (asChild && React.isValidElement(children)) {
    const childProps = children.props as React.HTMLAttributes<HTMLElement>; // 자식 요소의 속성을 가져오기 위해 사용
    return React.cloneElement(children, {
      ...props,
      className: cn(
        getButtonClasses(variant), // 버튼 클래스 반환 함수
        className, // 추가 클래스 속성
        childProps.className, // 자식 요소의 클래스 속성
      ),
    } as React.HTMLAttributes<HTMLElement>); //타입을 추론할 수 있도록 타입 캐스팅
  }

  return (
    <button {...props} className={cn(getButtonClasses(variant), className)}>
      {children}
    </button>
  );
}
