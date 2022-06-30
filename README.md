
안녕하세요:)

요구사항 완료여부는 각 PR에 체크표시로 남겨놓았습니다. feature 브랜치를 만들어야 하는데 내용을 조금 잘못 파악하여 main에 각 feature/* 브랜치를 만들어 머지하였습니다. main 브랜치로 확인해야하는 점 양해 부탁드립니다 🙇🏻‍♂️

의문점 이외에도 고민했던 지점도 공유하는것이 좋다고 생각하여 같이 작성하였습니다. 리뷰나 피드백은 항상 환영합니다:)

### 🕸 웹 vscode 환경
------

[바로가기]()



### ✏️ 의문 및 고민 지점
---------
#### 로그인

**제어 / 비제어 컴포넌트**

폼 데이터를 어떻게 다룰까 했을떄 필드가 많지 않고 push로 감지해야하는 조건이 많지 않기에 비제어로 선택했습니다
form target 속성을 활용하면 ref를 활용하지 않고도 컨트롤할 수 있기에 form 속성을 적극 활용하였습니다.

**로그인 인증**

서버사이드에서 진입하는 경우 cookie에 토큰을 담아 인증이 가능하지만 과제 규모나 요구사항을 보았을때 서버사이드 인증을 구현할 필요는 없어 보였습니다. 
제공된 단일 토큰값으로만 유저가 로그인했다고 확인하기가 조금 애매해다고 생각하여, 유저확인 API를 활용하여 로그인을 추가 확인하였지만 불안전하다고 생각합니다. 로그인한 유저가 잘못된 접근을 하는 경우 홈으로 리다이렉트해야 해야 하는데, 로직을 useEffect로 내부에 작성하기보다 컴포넌트를 하나 만들어 분리하고 필요한곳에 합성 재사용하도록 하였습니다.

#### 페이지네이션

**msw 서버사이드 mocking 문제**

API 요청을 한 경우 에러가 일어났고 getServerSideProps에서 요청을 하기에 host 환경이 달라 문제가 생기지 않나 생각하였습니다. 구글 검색 및 [msw 공식문서](https://mswjs.io/docs/getting-started/integrate/node#direct-usage)를 살펴보았고 node환경에서 경로를 정확히 설정해야 함을 알게 되어 불가피하게 handler 파일을 수정하였습니다.

**usePaginationQuery**

query 훅을 분리하려고 하였으나 그렇게 하면 page 상태가 usePagination에서 분리되어야 했습니다. usePagination을 먼저 작성하면 query에서 totalCount값을 받지 못하여 순서가 애매했습니다. 그래서 두 로직을 하나의 hook으로 만들었습니다. 처음에는 totalCount상태를 만들고 useEffect를 통하여 데이터와 렌더링을 동기화하였지만, suspense를 사용하면서 effect를 사용할 필요가 없이 작성할 수 있었습니다. 평소에 ErrorBoundary와 Suspsen를 활용하여 에러와 로딩을 위임하는 방식이 괜찮다고 생각하여 이번 기회에 활용하였는데 데이터 접근과 렌더링과 관련되서도 이점이 있는것 같습니다. 좀 더 정확하게 이해하기 위해 더 공부해보아야 할 것 같습니다.

#### 무한 스크롤

**뒤로가기**

뒤로가기 구현시 [nextjs에서 제공하는 config](https://mmazzarolo.com/blog/2021-04-10-nextjs-scroll-restoration/)를 활용하여 기능을 구현하였습니다. 그럼에도 불구하고 뒤로가기 진행시 데이터가 존재하지 않아 의문이였습다. react-query에서 cache가 제대로 되지 않아 문제가 있나 생각이 들어 [먼저 관련 문서](https://react-query.tanstack.com/guides/scroll-restoration)를 살펴보았습니다. query에서 scroll restoration은 문제가 없고, default cache time이 5분이여 해당 부분을 직접 확인하고자 react-query devtools를 설치하여 확인하였습니다. inactive로 들어간 상태가 캐싱되긴하지만 refetch가 일어나기에 getServerSideProps에서 호출이 일어나지 않나 생각하여 확인하고 해당 부분에서 재호출이 일어나고 있었습니다. 무한스크롤이기에 꼭 서버사이드 렌더링을 할 필요가 있나 다시 생각해보았고, 어차피 첫 데이터 이후에는 클라이언트에서 호출하며, 뒤로가기 문제를 해결하기 위해 클라이언트 렌더링으로 바꾸었습니다. 

#### 상품 상세

fallback true와 blocking 중 어떤것을 할까 고민하다 페이지가 무겁지 않고, router.isFallback 방어로직을 작성할 필요가 없다는 점, layout shift를 피할 수 있다는 점, 몇 crawler들은 Javascript을 지원이 원활하지 않다는 점에서 blocking으로 결정하였습니다. 추가로 ISR을 적용하기 위해 revalidate 옵션을 설정하였습니다.










 


