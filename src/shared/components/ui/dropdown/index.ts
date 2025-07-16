import DropdownItem from './DropdownItem';
import DropdownMenu from './DropdownMenu';
import DropdownRoot from './DropdownRoot';
import DropdownTrigger from './DropdownTrigger';

/**
 * Dropdown 컴포넌트는 여러 하위 컴포넌트(Trigger, Menu, Item)를 포함해
 * 드롭다운 UI를 구성합니다.
 *
 *
 * @example
 * ```tsx
 *     <Dropdown.Root>
 *       <Dropdown.Trigger>메뉴 열기</Dropdown.Trigger>
 *       <Dropdown.Menu>
 *         <Dropdown.Item onClick={() => alert('첫 번째 아이템 클릭')}>
 *           첫 번째 아이템
 *         </Dropdown.Item>
 *         <Dropdown.Item onClick={() => alert('두 번째 아이템 클릭')}>
 *           두 번째 아이템
 *         </Dropdown.Item>
 *       </Dropdown.Menu>
 *     </Dropdown.Root>
 * ```
 */
const Dropdown = {
  Root: DropdownRoot,
  Trigger: DropdownTrigger,
  Menu: DropdownMenu,
  Item: DropdownItem,
};

export default Dropdown;
