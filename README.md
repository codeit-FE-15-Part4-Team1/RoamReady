<p align="center"><a href="https://roam-ready-rho.vercel.app/activities">
<img width="300" height="200" alt="logo-text" src="https://github.com/user-attachments/assets/9a67d384-e9c8-4c40-a328-46f02d66f44b" />
<img width="60" height="50" alt="logo-symbol-blue" src="https://github.com/user-attachments/assets/5c210ec4-0916-44c3-83ba-991f139fb8c4" />
</a></p>

> **떠날 준비, 지금 바로, RoamReady – 즉흥의 설렘을 예약하세요.**



**롬레디 (RoamReady)** 는 Roam과 Ready의 결합어로, 언제든지 떠날 준비가 된 여행자와 체험가를 위한 액티비티 예약 플랫폼입니다.
<br> 즉흥적인 여행, 자유로운 탐험, 감각적인 경험을 추구하는 당신을 위해 감성적이면서도 실용적인 디자인, 빠르고 유연한 예약 흐름, 그리고 글로벌 확장을 고려한 구조로 설계했습니다.

**Next.js**와 **TypeScript** 기반의 안정적인 기술 스택 위에 BFF 아키텍처를 도입해 사용자 경험과 보안을 강화하였으며,
**Zustand**를 통한 상태 관리, **ky**와 **TanStack Query**를 활용한 API 요청 및 캐싱으로 깔끔하고 효율적인 사용자 경험을 제공합니다.

🎬 [바로 보기(YouTube에서 재생됩니다)](https://www.youtube.com/watch?v=ikNrX0suphQ)<br>

---

<table>
  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/92bd1a26-08e6-409a-b45c-e95d1a0a22be" alt="롬래디" width="800" />
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/22121479-f424-476e-b56d-15855534680e" alt="용민" width="700" />
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/510ac20c-de7d-462e-b3fa-586f317ca93b" alt="시은" width="700" />
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/707cb36c-0373-4642-80e8-3391d1157d1f" alt="서연" width="700" />
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/5419e3ed-ecf8-4190-81da-5964c27c6e25" alt="재현" width="650"/>
    </td>
  </tr>
  <tr>
    <th>R&R</th>
    <td><a href="https://github.com/Yongmin0423" >유용민</a></td>
    <td><a href="https://github.com/sgoldenbird" >송시은</a></td>
    <td><a href="https://github.com/Seon-K" >김서연</a></td>
    <td><a href="https://github.com/justhighway" >박재현</a></td>
  </tr>
  <tr>
    <td><strong>페이지</strong></td>
    <td>- 체험 등록 페이지<br>- 체험 수정 페이지<br>- 예약 현황 페이지</td>
    <td>- 로그인 페이지<br>- 회원가입 페이지<br>- 404페이지</td>
    <td>- 체험 상세 페이지 </td>
    <td>- 메인 페이지<br>- 마이페이지</td>
  <tr>
    <td><strong>공통 컴포넌트, <br> 공통 로직</strong></td>
    <td>- Button<br>- SelectBox<br>- Tabs</td>
    <td>- Input<br>- Toast<br>- OAuth<br>- 인증시스템<br>- 에러처리시스템</td>
    <td>- Dropdown<br>- Pagination<br>- Header<br>- Footer</td>
    <td>- BottomSheet<br>- Modal<br>- Profile </td>
  </tr>
  <tr>
    <td><strong>프로젝트 설정</strong></td>
    <td>- 배포</td>
    <td> </td>
    <td></td>
    <td>- ESLint, Pretter 설정<br>- Lefthook 설정</td>
  </tr>
  <tr>
    <td><strong>데모</strong></td>
    <td>- 발표 </td>
    <td>- README</td>
    <td>- 영상, gif</td>
    <td>- PPT</td>
  </tr>
</table>

---

## 👻 기술 스택

#### Core

| 기술           | 버전 / 도구             | 설명                                      |
| -------------- | ----------------------- | ----------------------------------------- |
| **TypeScript** | TypeScript 5            | 정적 타입으로 코드 안정성과 자동완성 향상 |
| **React**      | React 19.0.0            | 최신 기능 활용한 UI 구성                  |
| **Next.js**    | Next.js 15 (App Router) | 파일 기반 라우팅과 SSR, SEO에 강함        |

#### Runtime & Package Manager

| 기술        | 버전          | 설명                              |
| ----------- | ------------- | --------------------------------- |
| **Node.js** | 22.17.0 (LTS) | 안정적인 런타임 환경              |
| **pnpm**    | 10.x          | 빠른 설치 속도와 모듈 중복 최소화 |

#### Styling

| 기술               | 설명                  |
| ------------------ | --------------------- |
| **Tailwind CSS 4** | 빠르고 일관된 UI 구성 |

#### API & State Management

| 기술               | 설명                                                     |
| ------------------ | -------------------------------------------------------- |
| **Ky**             | Axios 대비 번들 사이즈가 작은 fetch 기반 HTTP 클라이언트 |
| **Zustand**        | 간단한 전역 상태 관리                                    |
| **TanStack Query** | 서버 상태와 캐싱을 효율적으로 관리                       |

#### Development Tools

| 기술                        | 설명                                                                               |
| --------------------------- | ---------------------------------------------------------------------------------- |
| **ESLint / Prettier**       | 코드 스타일 및 문법 일관성 유지                                                    |
| **CommitLint**              | 커밋 메시지 규칙을 통한 협업 품질 향상                                             |
| **lefthook**                | Git Hook 기반 자동화로 코드 품질 유지                                              |
| **Zod + React Hook Form**   | 타입 안전한 Form 유효성 검사                                                       |
| **GitHub Actions + Vercel** | PR 시 미리보기 배포 링크 자동 생성 및 댓글로 공유하는 자동화된 테스트 및 배포 환경 |

---

## 👻 트러블슈팅

▶ [더 많은 트러블 슈팅을 보고싶다면 이곳을 클릭해 확인하세요.](https://github.com/codeit-FE-15-Part4-Team1/RoamReady/discussions/categories/trouble-shooting)

<table>
  <thead>
    <tr>
      <th>문제 상황</th>
      <th>작성자</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://github.com/codeit-FE-15-Part4-Team1/RoamReady/discussions/134">로컬스토리지 → HTTP-only 쿠키: 인증 보안을 위해 아키텍처 개선</a></td>
      <td>송시은</td>
    </tr>
    <tr>
      <td><a href="https://github.com/codeit-FE-15-Part4-Team1/RoamReady/discussions/443">배포 환경에서 Server Component 에러 메시지 미노출 이슈 </a></td>
      <td>김서연</td>
    </tr>
    <tr>
      <td><a href="https://github.com/codeit-FE-15-Part4-Team1/RoamReady/discussions/250">React Hook Form + Custom Input</a></td>
      <td>유용민</td>
    </tr>
    <tr>
      <td><a href="https://github.com/codeit-FE-15-Part4-Team1/RoamReady/discussions/116">Dialog, BottomSheet 활성화 시 레이아웃 깨짐 없이 스크롤 막기</a></td>
      <td>박재현</td>
    </tr>
    <tr>
      <td><a href="https://github.com/codeit-FE-15-Part4-Team1/RoamReady/discussions/281">Next.js App Router에서 테스트 전용 페이지와 API 라우트를 프로덕션 빌드에서 안전하게 제외하는 방법</a></td>
      <td>송시은</td>
    </tr>
    <tr>
      <td><a href="https://github.com/codeit-FE-15-Part4-Team1/RoamReady/discussions/527">Next.js Image 배포 환경에서 이미지가 깨지는 문제 해결 (Vercel 402 PAYMENT_REQUIRED)</a></td>
      <td>박재현</td>
    </tr>
  </tbody>
</table>

---

## 👻 UX 개선 사항

▶ [더 많은 UX에 대한 고민을 보고 싶다면 이곳을 클릭해 확인하세요.](https://github.com/codeit-FE-15-Part4-Team1/RoamReady/discussions/categories/ux-improvement)

<table>
  <thead>
    <tr>
      <th>제목</th>
      <th>작성자</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <a href="https://github.com/codeit-FE-15-Part4-Team1/RoamReady/discussions/225">
          클라이언트 측 비밀번호 확인 로직 도입 (Zod refine 활용)
        </a>
      </td>
      <td>송시은</td>
    </tr>
    <tr>
      <td>
        <a href="https://github.com/codeit-FE-15-Part4-Team1/RoamReady/discussions/336">
          상세 페이지 이미지 클릭시 이미지 모달 기능
        </a>
      </td>
      <td>김서연</td>
    </tr>
    <tr>
      <td>
        <a href="https://github.com/codeit-FE-15-Part4-Team1/RoamReady/discussions/498">
          로그인/회원가입 UX 개선 (입력값 자동 유지 및 세션 일관성 확보)
        </a>
      </td>
      <td>송시은</td>
    </tr>
    <tr>
      <td>
        <a href="https://github.com/codeit-FE-15-Part4-Team1/RoamReady/discussions/370">
          알림 주기적 반영
        </a>
      </td>
      <td>김서연</td>
    </tr>
    <tr>
      <td>
        <a href="https://github.com/codeit-FE-15-Part4-Team1/RoamReady/discussions/486">
          Streaming SSR로 사용자 경험과 SEO 개선하기
        </a>
      </td>
      <td>박재현</td>
    </tr>
  </tbody>
</table>

---

## 👻 Engineering Breakdown

▶ [더 많은 설계 및 구현 문서를 보고싶다면 이곳을 클릭해 확인하세요.](https://github.com/codeit-FE-15-Part4-Team1/RoamReady/discussions/categories/engineering-breakdown)<br>

<table>
  <thead>
    <tr>
      <th>주제</th>
      <th>작성자</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://github.com/codeit-FE-15-Part4-Team1/RoamReady/discussions/205">API 요청 및 인증 아키텍처 가이드</a></td>
      <td>송시은</td>
    </tr>
    <tr>
      <td><a href="https://github.com/codeit-FE-15-Part4-Team1/RoamReady/discussions/104">Slot 패턴과 해당 패턴 사용을 위한 cloneElement</a></td>
      <td>유용민</td>
    </tr>
    <tr>
      <td><a href="https://github.com/codeit-FE-15-Part4-Team1/RoamReady/discussions/441">체험 상세 페이지 캐싱 전략</a></td>
      <td>김서연</td>
    </tr>
    <tr>
      <td><a href="https://github.com/codeit-FE-15-Part4-Team1/RoamReady/discussions/484">URL Query 기반의 필터, 정렬, 페이지네이션 구현하기</a></td>
      <td>박재현</td>
    </tr>
    <!-- <tr>
      <td><a href="https://github.com/Kabana-FE/Kabana/discussions/112">404 응답 상황 구분 및 처리 범위</a></td>
      <td>송시은</td>
    </tr> -->
  </tbody>
</table>

---

## 👻 TIL

▶ [더 많은 TIL을 보고 싶다면 이곳을 클릭해 확인하세요.](https://github.com/codeit-FE-15-Part4-Team1/RoamReady/discussions/categories/til)

<table>
  <thead>
    <tr>
      <th>제목</th>
      <th>작성자</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <a href="https://github.com/codeit-FE-15-Part4-Team1/RoamReady/discussions/376">
          requestAnimationFrame() 
        </a>
      </td>
      <td>김서연</td>
    </tr>
    <tr>
      <td>
        <a href="https://github.com/codeit-FE-15-Part4-Team1/RoamReady/discussions/153">
          리액트의 SetStateAction과 Dispatch 타입
        </a>
      </td>
      <td>박재현</td>
    </tr>
    <tr>
      <td>
        <a href="https://github.com/codeit-FE-15-Part4-Team1/RoamReady/discussions/83">
          Tailwind v4 @theme과 @utility
        </a>
      </td>
      <td>송시은</td>
    </tr>
  </tbody>
</table>

---

### 👻 프로젝트 문서 & 디자인

- [RoamReady 디자인(Figma)](https://www.figma.com/design/x6to2PaVbAuEErnUEikXpD/RoamReady?node-id=2-63300&t=j0HmtLVRmXgcE4J8-0)<br>
- [기반 디자인(Figma) Global Nomad](https://www.figma.com/design/KROZeaQGQncl3HalZmnRc2/-CCC-GlobalNomad?node-id=0-1&p=f&t=OZ7EcJ25ZmjifaSP-0)<br>
- [Docs (스타일 가이드, 브랜치 전략 등)](https://github.com/codeit-FE-15-Part4-Team1/RoamReady/discussions/categories/docs-convention-r-r-etc)<br>

---

### 👻 프로젝트 관리

애자일 + 워터폴의 장점을 섞은 협업 방식을 기반으로 코드 품질과 작업 효율을 높였습니다.
<br>다양한 커뮤니케이션과 GitHub Projects를 적극 활용하며 이슈 기반으로 작업을 관리했습니다.
<br>또한, 정기적인 커뮤니케이션을 통해 팀 작업의 가시성과 협업 효율성을 높였습니다.

- [칸반보드](https://github.com/orgs/codeit-FE-15-Part4-Team1/projects/1) – 작업 흐름을 실시간으로 트래킹
- [로드맵](https://github.com/orgs/codeit-FE-15-Part4-Team1/projects/1/views/4) – 주요 기능과 일정 관리
- [PR 리뷰(+코드래빗)](https://github.com/codeit-FE-15-Part4-Team1/RoamReady/pull/222) – 코드 품질 개선을 위한 상호 리뷰
- [데일리 스크럼](https://github.com/codeit-FE-15-Part4-Team1/RoamReady/discussions/categories/sprint-2) – 매일 진행 상황 공유 및 협의
- [디스커션](https://github.com/codeit-FE-15-Part4-Team1/RoamReady/discussions) – 설계, 트러블슈팅, 회고 등 다양한 논의

---

### 👻 팀 회고

- [팀 회고 보러 가기](https://github.com/codeit-FE-15-Part4-Team1/RoamReady/discussions/categories/retrospective)

---
