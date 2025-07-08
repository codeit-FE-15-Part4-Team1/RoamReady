import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 여러 개의 클래스명을 하나로 결합하고 Tailwind CSS 클래스 충돌을 해결하는 유틸 함수입니다.
 *
 * 동작 방식:
 * 1. `clsx`를 사용하여 문자열, 배열, 객체 형태의 클래스명을 조건부로 병합합니다.
 *    (예: 조건에 따라 클래스 적용 가능)
 * 2. 병합된 클래스 문자열을 `twMerge`에 전달하여 Tailwind CSS에서 중복되거나 충돌하는
 *    유틸리티 클래스를 자동으로 합쳐 최종 클래스 문자열을 생성합니다.
 *
 * @param {...ClassValue[]} inputs - clsx에서 지원하는 다양한 형식의 클래스명 인자들.
 *                                   문자열, 배열, 객체 등을 사용할 수 있습니다.
 * @returns {string} 충돌이 해결되고 하나로 합쳐진 최종 클래스 문자열.
 *
 * @example
 * ```tsx
 * cn('px-4 py-2', isActive && 'bg-blue-500', ['text-white', 'font-bold']);
 * // 결과: 'px-4 py-2 bg-blue-500 text-white font-bold'
 *
 * cn('p-2', 'p-4');
 * // 결과: 'p-4' (twMerge가 충돌하는 padding 클래스를 병합해줌)
 * ```
 *
 * @see {@link https://github.com/lukeed/clsx} clsx 공식 문서
 * @see {@link https://github.com/dcastil/tailwind-merge} tailwind-merge 공식 문서
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(...inputs));
};
