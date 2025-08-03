import MyPageContentHeader from '@/domain/Reservation/components/header';
import EditUserInfoForm from '@/domain/User/components/form/EditUserInfoForm';

/**
 * 사용자 정보 수정 페이지 컴포넌트
 *
 * 프로필 이미지 수정과 사용자 정보(닉네임, 비밀번호) 수정 기능을 제공합니다.
 * 모든 기능이 EditUserInfoForm 컴포넌트로 통합되어 관리됩니다.
 */
export default function MyInfoPage() {
  return (
    <div>
      <MyPageContentHeader
        title='내 정보'
        description='회원 정보를 수정할 수 있습니다.'
      />

      <EditUserInfoForm />
    </div>
  );
}
