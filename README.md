# 쇼핑몰 백엔드 API 서버

Node.js와 tRPC를 활용한 쇼핑몰 백엔드 API 서버입니다. 사용자 인증, 상품 관리, 리뷰, 카테고리 등 쇼핑몰에 필요한 주요 기능을 제공합니다.

## 기술 스택

- **Node.js**: 서버 런타임 환경
- **TypeScript**: 타입 안전성이 보장된 개발 언어
- **Express**: 웹 서버 프레임워크
- **tRPC**: 타입 안전한 API 개발 환경
- **MongoDB + Mongoose**: 데이터베이스 및 ODM
- **JWT**: 사용자 인증
- **bcrypt**: 비밀번호 해싱
- **Zod**: 입력 검증

## 주요 기능

### 사용자 관리
- 회원가입
- 로그인

### 상품 관리
- 상품 목록 조회
- 상품 상세 정보 조회
- 상품 검색
- 상품 추가/수정/삭제
- 카테고리별 상품 조회
- 상품 좋아요 기능

### 카테고리 관리
- 카테고리 추가/조회/수정/삭제

### 리뷰 관리
- 리뷰 작성/조회/수정/삭제

## 프로젝트 구조

```
src/
├── models/             # 데이터 모델
│   ├── category.model.ts
│   ├── product.model.ts
│   ├── response.model.ts
│   ├── review.model.ts
│   ├── type.model.ts
│   └── user.model.ts
├── routers/            # API 라우터
│   ├── category.route.ts
│   ├── home.router.ts
│   ├── product.router.ts
│   ├── review.router.ts
│   ├── type.route.ts
│   └── user.router.ts
├── context.ts          # tRPC 컨텍스트
├── db.ts               # 데이터베이스 연결
├── index.ts            # 애플리케이션 진입점
├── router.ts           # 메인 라우터
└── trpc.ts             # tRPC 설정
```

## 시작하기

### 필수 조건
- Node.js v16 이상
- MongoDB

### 설치

```bash
# 저장소 클론
git clone <repository-url>

# 디렉토리 이동
cd NodeJS_ShoppingApp_Server

# 의존성 설치
npm install
```

### 환경 설정

루트 디렉토리에 `.env` 파일을 생성하고 다음 정보를 설정합니다:

```
MONGODB_URI=mongodb://localhost:27017/shopping
JWT_SECRET=your_jwt_secret_key
SERVER_PORT=50003
```

### 실행

```bash
# 개발 모드 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 실행
npm start
```

## API 엔드포인트

모든 API는 `/api` 경로에서 tRPC를 통해 접근할 수 있습니다.

## 라이센스

ISC 