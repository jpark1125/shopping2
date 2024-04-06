# 프로젝트명: 쇼핑몰 플랫폼

## 1. 프로젝트 개요

### 프로젝트 소개
프로젝트는 쇼핑몰 플랫폼을 구현한 것으로, 판매자와 구매자 서버를 분리하여 각각의 기능을 제공합니다.

### 개발 인원
- 개발자: 1명

### 주요 기능
#### 판매자 서버
- 회원가입, 로그인
- 상품 등록/삭제/수정
- 상품 리스트 조회, 상세 조회
- 채팅룸 조회

#### 구매자 서버
- 회원가입, 로그인
- 상품 리스트 조회, 상세 조회
- 문의하기
- 장바구니 기능 (추가, 조회, 삭제)

## 개발 환경

- **운영 체제**: Windows
- **백엔드**: Node.js, Express, Socket.io
- **데이터베이스**: MySQL (MySQL2), Redis
- **인증**: bcryptjs, jsonwebtoken
- **파일 업로드**: multer, multer-s3
- **기타 도구**: Docker, AWS SDK, dotenv, nodemon, shortid, AWS CloudFront, axios
  
<hr>

## 2. 기능별 상세

##### 회원가입
- 사용자가 제공한 정보로 새로운 판매자 계정을 생성합니다.
- 고유 ID 생성과 함께 필수 정보(사용자 ID, 이메일, 비밀번호, 닉네임)를 받아 데이터베이스에 저장합니다.

##### 로그인
- 사용자 ID와 비밀번호를 기반으로 판매자 로그인을 처리합니다.
- 로그인 성공 시, 사용자에게 액세스 토큰과 리프레시 토큰을 발급합니다.

##### 상품 등록 (게시글 작성)
- 판매자가 상품 정보를 입력하여 새로운 상품을 등록합니다.
- 상품 정보는 데이터베이스에 저장되며, 이미지 파일은 AWS S3에 업로드됩니다.

##### 상품 삭제 (게시글 삭제)
- 판매자가 등록한 상품을 삭제할 수 있습니다.
- 상품 정보는 데이터베이스에서 제거되며, 관련 이미지 파일도 S3에서 삭제됩니다.

##### 상품 리스트 조회 (게시글 리스트 조회)
- 등록된 모든 상품의 리스트를 조회할 수 있습니다.
- 각 상품에 대한 기본 정보를 리스트 형태로 제공합니다.

##### 상품 상세 조회 (게시글 상세 조회)
- 특정 상품의 상세 정보를 조회할 수 있습니다.
- 상품에 대한 자세한 정보와 함께 저장된 이미지 파일의 URL을 제공합니다.

##### 상품 수정 (게시글 수정)
- 판매자는 자신이 등록한 상품의 정보를 수정할 수 있습니다.
- 수정된 정보는 데이터베이스에 반영됩니다.

##### 채팅룸 조회
- 판매자와 구매자 간의 실시간 채팅 기능을 지원합니다.
- 판매자는 자신이 속한 채팅룸의 리스트를 조회할 수 있습니다.

### 구매자 서버

##### 회원가입, 로그인
- 구매자도 판매자와 같은 절차로 회원가입과 로그인을 할 수 있습니다.

##### 상품리스트 조회, 상품 상세 조회
- 구매자는 등록된 상품의 리스트를 조회하고, 특정 상품에 대한 상세 정보를 볼 수 있습니다.

##### 문의하기
- 구매자는 해당 게시글의 상품에 대해 판매자에게 문의하기를 요청할 수 있습니다.
- 문의하기 기능을 통해 해당 게시글의 판매자와 채팅룸이 생성됩니다.

##### 장바구니 기능
- 구매자는 상품을 장바구니에 추가하고, 장바구니 내용을 조회 및 삭제할 수 있습니다.
