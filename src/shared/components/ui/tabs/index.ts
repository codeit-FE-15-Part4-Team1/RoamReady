/**
 * @fileoverview
 * Tabs UI 컴포넌트 네임스페이스입니다.
 * - Tabs.Root: 탭 상태 관리 및 Context Provider
 * - Tabs.List: 탭 버튼 컨테이너, 키보드 네비게이션 지원
 * - Tabs.Trigger: 탭 버튼, 클릭 시 value 변경
 * - Tabs.Content: 탭별 내용, value가 일치할 때만 렌더링
 *
 * @example
 * <Tabs.Root defaultValue="tab1">
 *   <Tabs.List>
 *     <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
 *     <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
 *   </Tabs.List>
 *   <Tabs.Content value="tab1">Content 1</Tabs.Content>
 *   <Tabs.Content value="tab2">Content 2</Tabs.Content>
 * </Tabs.Root>
 */

import TabsContent from './TabsContent';
import TabsList from './TabsList';
import TabsRoot from './TabsRoot';
import TabsTrigger from './TabsTrigger';

const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
};

export default Tabs;
