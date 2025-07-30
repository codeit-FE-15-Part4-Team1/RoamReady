import ExperienceCardContent from './ExperienceCardContent';
import ExperienceCardFooter from './ExperienceCardFooter';
import ExperienceCardImage from './ExperienceCardImage';
import ExperienceCardRoot from './ExperienceCardRoot';

/**
 * ExperienceCard 컴파운드 컴포넌트
 * 예약 내역과 내 체험 관리에서 공통으로 사용할 수 있는 카드 컴포넌트입니다.
 */
export const ExperienceCard = {
  Root: ExperienceCardRoot,
  Image: ExperienceCardImage,
  Content: ExperienceCardContent,
  Footer: ExperienceCardFooter,
};

export default ExperienceCard;
