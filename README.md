# 🎁 𝗚𝗶𝗳𝘁-𝗠𝗼𝗺𝗲𝗻𝘁-𝗖𝗹𝗶𝗲𝗻𝘁 🎁

> [Gift Moment 프로젝트 설명 바로 가기](https://github.com/luckynode)

</br>

## 👥 𝗠𝗲𝗺𝗯𝗲𝗿𝘀 𝗮𝗻𝗱 𝗥𝗼𝗹𝗲𝘀

| 이름        | 역할               | 담당 파트           |
|-------------|--------------------|---------------------|
| [김선화](https://github.com/sunhwaaRj) | Frontend            | 회원, 위시리스트, 선물 결제    |
| [노경희](https://github.com/khee2) | Frontend            | 편지, 선물, CI/CD 파이프라인 |

</br>

## 📂 𝗣𝗿𝗼𝗷𝗲𝗰𝘁 𝗙𝗼𝗹𝗱𝗲𝗿 𝗦𝘁𝗿𝘂𝗰𝘁𝘂𝗿𝗲
```plaintext
gift-moment-client
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
│   └── home/
├── src/
│   ├── apis/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── routes/
│   ├── types/
│   │   ├── api/
│   │   └── common/
│   ├── App.tsx
│   ├── main.tsx
├── .gitignore
├── index.html
├── package.json
├── README.md
├── tsconfig.json
└── vite.config.ts
```
</br>

## 🔧 𝗧𝗲𝗰𝗵 𝗦𝘁𝗮𝗰𝗸
- **React** (v18.3.1)
- **Vite** (v5.4.10)
- **TypeScript** (~5.6.2)
- **styled-components** (v6.1.13)
- **axios** (v1.7.8)
- **react-router-dom** (v6.28.0)
- **AWS S3**
- **CloudFront**
- **GitHub Actions** (CI/CD)

![Gift Moment](https://github.com/user-attachments/assets/61a24b08-68d5-4fcb-a20d-42b6643547df)

</br>


## ✨ 𝗖𝗼𝗻𝘃𝗲𝗻𝘁𝗶𝗼𝗻𝘀
### 𝗖𝗼𝗺𝗺𝗶𝘁 𝗖𝗼𝗻𝘃𝗲𝗻𝘁𝗶𝗼𝗻𝘀

| **커밋 유형**       | **설명**                                                                 |
|--------------------|-------------------------------------------------------------------------|
| `Feat`             | 새로운 기능 추가                                                        |
| `Fix`              | 버그 수정                                                               |
| `Docs`             | 문서 업데이트                                                           |
| `Style`            | 코드 포맷 변경 (기능 변경 없음)                                          |
| `Refactor`         | 코드 리팩토링                                                           |
| `Test`             | 테스트 코드 추가                                                       |
| `Chore`            | 기타 변경 사항 (빌드 설정, 패키지 수정 등)                               |
| `Design`           | UI/UX 관련 디자인 수정                                                  |
| `Comment`          | 주석 추가 및 수정                                                       |
| `Rename`           | 파일 또는 폴더 이름 변경                                                |
| `Remove`           | 파일 삭제                                                               |
| `!BREAKING CHANGE` | 주요 변경 사항                                                          |
| `!HOTFIX`          | 긴급 수정                                                              |


#### 𝗥𝘂𝗹𝗲𝘀
1. 제목은 50자 이내로 작성하며, 대문자로 시작하고 끝에는 마침표를 사용하지 않음
2. 제목에는 이슈 번호와 
3. 제목과 본문은 한 줄 띄워 구분
4. 본문에는 변경 내용과 이유를 상세히 작성

#### 𝗘𝘅.
```bash
git commit -m "[#2] Feat: 회원가입 기능 추가

- 회원가입 API 구현
- 유효성 검사 추가"
```

### 𝗕𝗿𝗮𝗻𝗰𝗵 𝗖𝗼𝗻𝘃𝗲𝗻𝘁𝗶𝗼𝗻𝘀 

| **브랜치 유형**      | **설명**                                                                 | **예시**
|--------------------|-------------------------------------------------------------------------|-----------------|
| `develop`             | 개발 환경 코드                                                ||
| `feature/<이슈번호>-<기능명>`  | 새로운 기능 개발 브랜치                                                  |feature/2-letter-ui|

</br>
