/** @type {import("prettier").Config} */
export default {
  // 문자열은 작은따옴표 사용
  singleQuote: true,

  // 객체 key가 불필요하면 따옴표 생략
  quoteProps: "as-needed",

  // JSX 안에서도 작은따옴표 사용
  jsxSingleQuote: true,

  // 세미콜론 사용
  semi: true,

  // 최대 줄 길이 (가독성 80)
  printWidth: 80,

  // 들여쓰기 스페이스 2칸
  tabWidth: 2,

  // 들여쓰기에 space 사용
  useTabs: false,

  // 객체나 배열 마지막 항목에도 쉼표 붙임 (Diff 최소화, git log 깔끔)
  trailingComma: "all",

  // 화살표 함수 파라미터가 1개여도 괄호 유지 (일관성)
  arrowParens: "always",

  // HTML/JSX 태그 닫는 부호는 새 줄에
  bracketSameLine: false,

  // 중괄호 내부 공백 생성
  bracketSpacing: true,

  // OS 간 줄바꿈 통일 (LF 권장)
  endOfLine: "lf",

  // Tailwind 클래스 자동 정렬
  plugins: ["prettier-plugin-tailwindcss"],
};
