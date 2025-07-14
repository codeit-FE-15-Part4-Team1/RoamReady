/**
 * @fileoverview Tabs 컴포넌트 모듈
 *
 * 접근성을 고려한 탭 인터페이스를 제공하는 컴포넌트들의 집합입니다.
 * 키보드 네비게이션, ARIA 속성을 지원합니다.
 *
 * @example
 * ```tsx
 * import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
 *
 * function MyComponent() {
 *   return (
 *     <Tabs defaultValue="tab1">
 *       <TabsList>
 *         <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *         <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *       </TabsList>
 *       <TabsContent value="tab1">Content 1</TabsContent>
 *       <TabsContent value="tab2">Content 2</TabsContent>
 *     </Tabs>
 *   );
 * }
 * ```
 */

/** Tabs 루트 컴포넌트 - Context Provider 역할 */
export { default as Tabs } from './Tabs';

/** TabsContent 컴포넌트 - 탭 콘텐츠 영역 */
export { default as TabsContent } from './TabsContent';

/** TabsList 컴포넌트 - 탭 버튼들의 컨테이너 + 키보드 네비게이션 */
export { default as TabsList } from './TabsList';

/** TabsTrigger 컴포넌트 - 개별 탭 버튼 */
export { default as TabsTrigger } from './TabsTrigger';
