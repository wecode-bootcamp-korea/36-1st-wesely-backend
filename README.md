# [TEAM_WESELY]WECODE 36기 1차 프로젝트

## 프로젝트 소개
- 제목 : 생활용품 정기구독 사이트 [WISELY](https://www.wiselycompany.com/home/main)클론 프로젝트
- 선정이유
  - FE 측면: 반응형 사이트, 케럿셀, 아코디언, 상품 내부 옵션별 이미지 삽입, 리뷰 평점 분포 그래프, 평점 표현 시 소수 한 자리 반올림, 쿼리파라미터(페이지네이션, 오더링) 구현 가능
  - BE 측면: 일반구매 및 정기구독 조건 구분, 상품 내부 옵션별 데이터 구성, 상품별 평점 계산 시 서브쿼리 사용, 쿼리파라미터(페이지네이션, 오더링), 로그인, 회원가입, 장바구니 담기 및 수량 조절 기능 구현 가능
- 개발은 초기 세팅부터 직접 구현했으며, 하단 데모 영상에서 보이는 부분은 프론트 백엔드 연결을 통해 사용 가능한 서비스를 구현한 영상입니다 
- [구현 기능 데모 영상](https://youtu.be/LgIgJsmdHhU)

### 개발 인원 및 기간
- 팀명: 위즐리(WESELY)
- 개발기간 : 2022년 08월 16일 ~ 2022년 08월 25일 (10일)
- 개발인원 : 프론트엔드 3명, 백엔드 3명 
  * FE : 김다현, 김진혁, 문준기
  * BE : 박명호, 이솔, 정재하
  - [프론트엔드 github 링크](https://github.com/wecode-bootcamp-korea/36-1st-wesely-frontend)

### 1차 프로젝트 회고록
- [박명호](https://seatbelt.tistory.com/118)
- [이솔]()
- [정재하](https://jaeha2324.tistory.com/29)

<br>

## 적용 기술 및 구현 기능

### 적용 기술

- 프론트엔드 : <img src="https://img.shields.io/badge/JavaScript-FFCA28?style=flat-square&logo=javascript&logoColor=white"/>
  <img src="https://img.shields.io/badge/React.js-58c3cc?style=flat-square&logo=React&logoColor=white"/>
  <img src="https://img.shields.io/badge/Sass-58c3cc?style=flat-square&logo=Sass&logoColor=white"/>
  <img src="https://img.shields.io/badge/React.js-58c3cc?style=flat-square&logo=React&logoColor=white"/>
  <img src="https://img.shields.io/badge/CRA-58c3cc?style=flat-square&logo=Create-React-App&logoColor=white"/>
  <img src="https://img.shields.io/badge/React Router Dom-gray?style=flat-square&logo=React-Router&logoColor=F6BB43"/>
  <img src="https://img.shields.io/badge/scss-4AA8D8?style=flat-square&logo=Sass&logoColor=white"/>
  <img src="https://img.shields.io/badge/eslint-000066?style=flat-square&logo=eslint&logoColor=white"/>
  <img src="https://img.shields.io/badge/prettier-00CC00?style=flat-square&logo=eslint&logoColor=white"/>
- 백엔드 : <img src="https://img.shields.io/badge/JavaScript-FFCA28?style=flat-square&logo=javascript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Node.js-008000?style=flat-square&logo=Node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express-000080?style=flat-square&logo=Express&logoColor=white"/>
  <img src="https://img.shields.io/badge/ MySQL8.0-6441a5?style=flat-square&logo=MySQL&logoColor=white"/>
  <img src="https://img.shields.io/badge/Postman-F6BB43?style=flat-square&logo=Postman&logoColor=white"/>
  <img src="https://img.shields.io/badge/Bcrypt-F6BB43?style=flat-square&logo=Bcrypt&logoColor=white"/>
  <img src="https://img.shields.io/badge/JWT-F6BB43?style=flat-square&logo=JWT&logoColor=white"/>
- 협업 툴 : <img src="https://img.shields.io/badge/Notion-1c1c1c?style=flat-square&logo=Notion&logoColor=white"/> <img src="https://img.shields.io/badge/Slack-553830?style=flat-square&logo=Slack&logoColor=white"/> <img src="https://img.shields.io/badge/Gather-8B00F?style=flat-square&logo=Gather&logoColor=white"/>


### 구현 기능
  * 박명호 [(github링크)](https://github.com/seatbelt92)
    - 메인 페이지
    - 제품 전체 페이지
    - 제품 상세 페이지(상품 및 리뷰)
  * 이솔 [(github링크)](https://github.com/isol78)
    - 로그인
    - 회원가입
  * 정재하 [(github링크)](https://github.com/JeongJaeHa)
    - 장바구니 페이지

### 상세내용

|      분류       |      기능      |                                        구현사항                                                           |
|:-------------:|:-------------:|:-------------------------------------------------------------------------------------------------------:|
| 메인 페이지 | 기준별 상품 정렬 | <ul> GROUP BY, ORDER BY 활용 - 평점 및 판매량 기준, 상위 9개 제품 정보 전달 </ul>|
| 제품 전체 페이지 | 정렬 기준 다양화 | <ul> req.query로 받은 매개변수 활용 ORDER BY 적용 - 가격 높은 순, 가격 낮은 순, 판매량, 리뷰 순서 정렬 기능 구현 </ul>|
| 제품 전체 페이지 | 페이지네이션 | <ul> req.query로 받은 매개변수 활용 LIMIT, OFFSET 적용 - 쿼리파라미터로 프론트 측 설정값에 반응하여 특정 수량의 제품 조회 </ul>|
| 제품 상세 페이지 | 상품별 평점 전달 | <ul> 서브쿼리 활용하여 리뷰테이블 상품 기준 그룹화 및 Alias를 통해 서브쿼리 컬럼 재사용 - res.params로 전달된 productId에 대한 정보 전달 </ul>|
| 회원가입 | 유효성 검사 | <ul> 조건문과 정규표현식을 이용한 개인 정보 유효성 검사 진행, 유효성 검사를 통과하지 못한 경우 에러 메세지를 반환 예외 처리 구현 <ul> |
| 로그인 | 페이지 분기 처리 | 유저 이메일 유효성 검사로 로그인단에서 회원가입창과 로그인으로 분기되는 로직 반영, 로그인 성공 시 JWT 발급 |
|       장바구니      |     정보 전송    |<ul> JWT를 받아 유효성 여부를 검증 한 뒤 유효한 경우 carts table에 저장 된 해당 유저와 일치하는 정보를 전달 </ul> |
|       장바구니      |     품목 삭제    |<ul>         장바구니 페이지에서 물품 삭제 시 DELETE method를 통해 carts table에서 삭제             </ul>|
|       장바구니      |     수량 증감    |<ul>        장바구니 페이지에서 물품 수량 증감 시 DB와 통신을 통한 수량 실시간 반영                  </ul>|

<br>

## Reference

- 이 프로젝트는 [와이즐리](https://www.wiselycompany.com/home/main) 사이트를 참조하여 학습목적으로 만들었습니다.
- 실무수준의 프로젝트이지만 학습용으로 만들었기 때문에 이 코드를 활용하여 이득을 취하거나 무단 배포할 경우 법적으로 문제될 수 있습니다.
- 이 프로젝트에서 사용하고 있는 사진 대부분은 위코드에서 구매한 것이므로 해당 프로젝트 외부인이 사용할 수 없습니다.
