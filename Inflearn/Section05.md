# 섹션 5. 백엔드 개발자가 퇴사했다

- request memoization과 data cache
  - nextjs 13 app router 부터는 **서버 컴포넌트가 도입**되면서 프론트 서버의 부담이 많이 늘었기 때문에 캐싱 기능을 적절히 사용해서 서버의 부담을 줄여주는 것이 좋다.
  - Nextjs에서 제공하는 캐싱 전략
  [Building Your Application: Caching](https://nextjs.org/docs/app/building-your-application/caching)
  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/78920e6f-4678-419c-8b55-931e5e631f8c/Untitled.png)
  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/ab3dfdd5-7b07-4bc3-96a8-fda5bb71cc57/Untitled.png)
  - BUILD TIME: 배포하기 전 빌드 할 때
  - REQUEST TIME: 배포 후 실제 요청이 사용자로부터 왔을 때
    <aside>
    💡 빌드한 결과물로 배포를 진행하기 때문에 빌드 타임 때 최대한 최적화를 진행하는 것이 좋다.
    
    </aside>
    
    - /a : 페이지들 (홈, 메시지, 서치, …)
    
    ## 💠 Request Memoization
    
    페이지를 렌더링 할 때 중복된 요청이 있으면 그것들을 제거해준다.
    
    <aside>
    💡 **캐싱 설명 파악하기**
    - Duration: 지속 시간
    - Revalidating: 캐시를 무효화하고 새로운 캐시를 받아오는 시간 (갱신 시간)
    - Opting out: 캐시를 안 하는 방법
    
    </aside>
    
    - **Duration**: Request Memoization의 캐시는 React 컴포넌트 트리가 렌더링을 완료할 때까지 서버 요청의 수명(lifetime) 동안 지속
    - **Revalidating**: 메모이제이션은 서버 요청 간에 공유되지 않고 렌더링 중에만 적용되므로 재검증(revalidate)할 필요가 없다. (⇒ 한 페이지를 렌더링하고 다시 해당 페이지를 렌더링하면 새로운 요청을 보내기 때문에 필요 없음)
    - **Opting out**: 메모이제이션을 하지 않으려면 fetch 요청에 AbortController의 signal을 전달한다.
    
    ```tsx
    const { signal } = new AbortController()
    fetch(url, { signal })
    ```
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/1ee8a1ac-8f98-4790-95c6-00077a295600/Untitled.png)
    
    ```tsx
    export async function generateMetadata({ params }: Props) {
      const user: User = await getUserServer({
        queryKey: ["users", params.username],
      });
      const post: Post = await **getSinglePostServer**({
        queryKey: ["posts", params.id],
      });
      return {
        title: `Z에서 ${user.nickname} 님 : ${post.content}`,
        description: post.content,
      };
    }
    
    export default async function Page({ params }: Props) {
      const { id } = params;
      const queryClient = new QueryClient();
      await queryClient.prefetchQuery({
        queryKey: ["posts", id],
        queryFn: **getSinglePostServer**,
      });
      await queryClient.prefetchQuery({
        queryKey: ["posts", id, "comments"],
        queryFn: getComments,
      });
    ```
    
    위 코드에서 getSinglePostServer 함수의 경우 두 번 작성되어서 두 번 요청이 되는건 아닐까 싶을 수 있다.
    
    Nextjs에서는 이러한 상황에서 알아서 판단을 통해 **중복된 요청을 한 번의 요청으로 받아들인다.**
    
    즉 현재 요청이 getUserServer, getSinglePostServer, getSinglePostServer, getComments 총 4가지의 요청이 있지만, Nextjs에서는 중복된 요청을 하나의 요청으로 처리해 최종적으로는 getUserServer, getSinglePostServer, getComments 총 3가지만 서버에 요청한다.
    
    ## 💠 Data chache
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/b3bc5a40-38d5-4571-b9fe-2619e0f493d9/Untitled.png)
    
    페이지와는 상관 없이 프론트 서버에서 백엔드 서버 혹은 DB로 보낸 요청을 프론트 서버에서 얼마나 오래 캐시할 지 설정
    
    > `MISS`: 캐시가 없음 / `HIT`: 백엔드 서버로부터 데이터를 가져옴 / `SET`: 캐시로 저장
    > 
    
    ### ✔️ 기본 캐시 설정
    
    - **Duration**: 새로 고침하거나 캐시를 쓰지 않는 이상 계속 유지된다. (따라서 Revalidate나 Opting out을 잘 해줘야하는 이유!)
    - **Revalidating**: 일정 시간이 지나면 캐시를 갱신하거나(Time-based Revalidation), 코드로 직접 캐시를 갱신할 수 있다.(On-demand Revalidation)
        - Time-based Revalidation
        
        ```tsx
        // Revalidate at most every hour
        fetch('https://...', { next: { revalidate: 3600 } }) // 1시간 동안 캐시 유지
        ```
        
        - On-demand Revalidation
            - 태그 방식
            
            `revalidateTag()` 로 지정된 태그의 캐시를 무효화시킬 수 있다.
            
            ```tsx
            fetch('https://...', { next: { tags: ['users'] } });
            
            ...
            
            revalidateTag('users');
            ```
            
            - 패스 방식
            
            `revalidatePath()` 로 지정된 경로의 모든 요청에 대한 캐시를 무효화시킬 수 있다.
            
            ```tsx
            revalidatePath('/home');
            ```
            
    - **Opting Out**: 데이터 캐시를 안쓰는 방법은 fetch 함수에 `chache: no-store` 로 설정
        - `{ cache: 'no-store' }`
            - 데이터 캐시를 캐싱하지 않겠다
        
        ```tsx
        export async function generateMetadata({ params }: Props) {
          const user: User = await getUserServer({
            queryKey: ["users", params.username],
          });
          const post: Post = await **getSinglePostServer**({
            queryKey: ["posts", params.id],
          });
          return {
            title: `Z에서 ${user.nickname} 님 : ${post.content}`,
            description: post.content,
          };
        }
        
        export default async function Page({ params }: Props) {
          const { id } = params;
          const queryClient = new QueryClient();
          await queryClient.prefetchQuery({
            queryKey: ["posts", id],
            queryFn: **getSinglePostServer**,
          });
          await queryClient.prefetchQuery({
            queryKey: ["posts", id, "comments"],
            queryFn: getComments,
          });
        ```
        
        위에서 보았던 동일한 코드로 설명하자면, Request Memoization에 의해 총 3번의 요청이 되었다면, 그 3번의 요청을 프론트 서버에서 얼마나 오래 기억할 것인지 설정하는 것이다.
        
        예를 들어 getSinglePostServer의 코드에 `cache: 'no-store'` 를 추가해주면 nextjs의 프론트 서버에 해당 요청이 캐싱되지 않는다.
        
        ```tsx
        export const getSinglePostServer = async ({
          queryKey,
        }: {
          queryKey: [string, string];
        }) => {
          const [_1, id] = queryKey;
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`,
            {
              next: {
                tags: ["posts", id],
              },
        			**cache: 'no-store'**
              credentials: "include",
              headers: { Cookie: cookies().toString() },
            }
          );
        ```
        
        <aside>
        💡 **third-party library 캐싱 막기**
        만약, 라이브러리를 사용하고 있다면 라이브러리에서도 백엔드 서버에 요청을 하고 있을 수 있다. Nextjs에서는 해당 요청들도 모두 캐싱이 되기 때문에 라이브러리의 캐싱을 막고 싶다면 page.tsx에 아래의 코드를 삽입한다.
        
        ```tsx
        export const dynamic = 'force-dynamic'
        ```
        
        기본적으로 코드로 작성되는 fetch 함수 등의 캐싱은 위의 방식대로 개발자가 컨트롤 할 수 있지만 라이브러리에서 보내는 요청 같은 경우에는 직접 컨트롤 할 수 없기 때문에 위의 방식을 사용하면 된다.
        
        </aside>

- Full Route Cache와 Router Cache(static vs dynamic)
  ## 💠 Full Route Cache
  page.tsx를 빌드 타임에 얼마동안 캐시할지
  1. 서버 컴포넌트랑 클라이언트 컴포넌트를 미리 빌드
  2. 페이지에 넘어갈 때마다 미리 빌드한 서버 컴포넌트와 클라이언트 컴포넌트를 제공
  페이지 내에 변하는 요소가 하나라도 있다면 다시 캐시를 받아오기 때문에 Full Route Cache가 제대로 동작되려면 페이지에 변하는 요소가 없어야 한다.
  - **Duration**: Full Route Cache는 기본적으로 지속적이다.
  - **Invalidate**:
    - Data Cache가 수정되면 Full Route Cache도 갱신된다. 즉, `cache: no-store` 가 페이지 내에 하나라도 존재한다면 캐시되지 않는 부분(매번 새로운 데이터로 갱신)이 있는 것이기 때문에 사실상 Full Route Cache는 의미가 없다.
    - 재배포하게 되면 새롭게 빌드하기 때문에 재배포 될 때 Full Route Cache가 갱신된다.
  - **Opting Out**: Dynamic Functions(cookies, headers, useSearchParams, searchparams)를 사용하거나 데이터 캐시를 Opting Out하면 Full Route Cache를 Opting Out 할 수 있다.
  ## 💠 Router Cache
  Next.js에는 사용자 세션 동안 개별 경로 세그먼트로 분할된 React 서버 컴포넌트 페이로드를 저장하는 메모리 내 클라이언트 측 캐시가 있는데 이를 Router Cache라 한다.
  Router Cache는 다른 페이지내 동일한 레이아웃을 갖는다면 해당 레이아웃을 캐싱한다. (⇒ 레이아웃은 재사용되기 때문에 굳이 서버에서 다시 받아올 필요가 없다.)
  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/13ca2269-107f-4ba2-8cae-2096401abd2e/Untitled.png)
  - **Duration**: 페이지를 새로고침 하기전까지 계속 유지된다.
    - 자동 재검증(invalidation) 기간
      - Dynamically Rendered: 30초 유지
      - Statically Rendered: 5분 유지
      - 동적으로 렌더링 되는지, 정적으로 렌더링 되는지는 아래의 표에 의해 결정된다.
        | Dynamic Functions | Data       | Route                |
        | ----------------- | ---------- | -------------------- |
        | No                | Cached     | Statically Rendered  |
        | Yes               | Cached     | Dynamically Rendered |
        | No                | Not Cached | Dynamically Rendered |
        | Yes               | Not Cached | Dynamically Rendered |
      - 동적으로 렌더링 되지만 5분간 캐시를 유지하고 싶다면 컴포넌트에 `prefetch={true}` 를 추가한다. ex) `<Link prefetch={true}>`
  - **Invalidation**: revalidatePath나 revalidteTag 사용 / cookie.set or cookie.delete / router.refresh 를 한다.
  - **Opting out**: Router Cache에서는 Opting out 할 수 없다.
- Static(SSG) 모드와 사라진 ISR 모드
    <aside>
    💡 Nextjs App Router에는 2가지 배포 모드가 존재한다. (Static Mode / Dynamic Mode(default))
    기존 Page Router에서는 3가지였었다.
    
    </aside>
    
    ## 💠 Static Mode
    
    - Static Mode로 배포하는 방법
    
    [Deploying: Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
    
    ```tsx
    // next.config.js
    const nextConfig = { output: 'export' }
    
    module.exports = nextConfig;
    ```
    
    Static Mode는 Next Server 없이 html 페이지들 만으로 구성된 정적인 사이트로 빌드된다.
    
    정적인 사이트란, 빌드를 하는 순간 모든 컨텐츠가 결정되기 때문에 Next Server가 필요없다.
    
    트위터 같은 SNS형태 같은 경우에는 다이나믹으로 매번 컨텐츠를 업데이트 해주어야 하지만, 블로그나 뉴스 사이트 같은 경우에는 정적 배포만으로도 동작하기 때문에 다이나믹 모드로 빌드하지 않아도 된다.
    
    ### ✔️ Static Mode 배포 시 제약 사항
    
    Static Mode는 빌드 과정 중에 동적 로직을 지원하지 않기 때문에 공식문서에 나와있는 몇가지의 기능들을 사용할 수 없다.
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/57ed7477-db0d-4cf5-8a6c-12c3f4bad7ae/Untitled.png)
    
    ### ✔️ 사라진 ISR 모드
    
    SSG(Static Site Generation)모드에서는 매번 새로운 컨텐츠가 생길 때마다 다시 전체를 빌드해야 하는 과정이 번거롭기 때문에 서버 하나를 추가적으로 두고 ISR(Incremetal Static Regeneration) 모드를 적용해 일정 주기로 컨텐츠가 업데이트 되거나 새로 발행된 컨텐츠가 있다면 그때 마다 HTML을 다시 만들거나 새롭게 추가할 수 있게끔 했었다.
    
    App Router로 업데이트 되면서 Nextjs의 캐시 전략과 함께 ISR 모드의 개념이 합쳐졌고, (Full Route Caching로 구현 가능함) 이는 다이나믹 모드에서만 활성화된다.

- 배포 직전 build 하기
  ```bash
  $ npm run build

  # 또는
  $ next build
  ```
  build 명령어 실행 후 발생하는 에러들 해결하기
    <aside>
    ⚠️ **ERROR: unhandledRejection ReferenceError: Headers is not defined at Object**
    
    </aside>
    
    node 버전을 18+으로 업데이트 하기
    
    [Github workflow for nextjs: unhandledRejection ReferenceError: Headers is not defined · community · Discussion #72835](https://github.com/orgs/community/discussions/72835)
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/e39f5074-16b7-48ca-b7e7-ea18aed7b7e5/Untitled.png)
    
    ## 💠 build 파일 살펴보기
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/fdfb9efe-0aa3-417b-97c1-9426f2203ccd/Untitled.png)
    
    파일 앞에 ‘O’ 라고 써있으면 Static 렌더링된 페이지이고, ‘λ’ 는 Dynamic 렌더링된 페이지이다.
    
    300KB 안으로 다운로드 되어야 빠르게 렌더링된다고 보면 된다.
    
    현재 message 페이지는 faker를 사용하고 있어서 용량이 큰 것으로 예상된다.
    
    <aside>
    💡 Nextjs PageRouter는 페이지 별로 쪼개져 있기 때문에 각각의 페이지의 용량이 대부분 낮다는 장점이 있다.
    
    </aside>
    
    ## 💠 배포 실행
    
    ```bash
    $ npm start
    ```
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/713f3617-a15f-48cc-ad89-291bd8ed7e18/Untitled.png)
    
    localhost:3000에서 배포된 사이트를 확인해볼 수 있다.
    
    하지만 현재 로컬 환경에서 배포되었기 때문에 따로 AWS 등의 사이트에 올려서 도메인과 연결해주는 것이 실제 서비스와 동일하게 맛볼 수 있다.
    
    현재 프론트 서버와 백엔드 서버, DB가 있기 때문에 총 3개의 서버를 배포해야 한다.
    
    요즘은 프론트 서버는 프론트 개발자가 배포하는 것까지가 트렌드이다.

- 보너스: 배포 맛보기(과금주의)
  1. 프로젝트 파일 git 업로드
  2. AWS EC2 인스턴스 추가
  - 인스턴스 시작
  - Ubuntu 선택
  - 인스턴스 유형 - t2.small 선택
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/76914cfc-3aeb-482c-8262-b0c79c53afee/Untitled.png)
    - 프리 티어 사용 가능 유형으로 선택해야 무료로 서비스를 배포할 수 있지만, 현재 서비스 메모리가 크기 때문에 돌아가지 않는다.
  - 키 페어 - 키 페어 없이 계속 진행
  - 네트워크 설정 - 보안 그룹 생성
  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/a0feba4f-248a-4ed9-b28f-1c4c5652bfc1/Untitled.png)
  - 스토리지 - 30GB
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/4a2fa844-e73f-49ce-9aed-4dca3073c68e/Untitled.png)
    - 30GB까지는 무료
  - 인스턴스가 생성되면 인스턴스 상태가 실행 중이 될 때까지 기다리기
  1. 포트 번호 수정
     1. 3000 포트에서 80 포트로 수정

        ```tsx
        // src\middleware.ts
        import { auth } from "./auth";
        import { NextResponse } from "next/server";

        export async function middleware() {
          const session = await auth();

          // 현재 로그인이 되어 있지 않다면 로그인 페이지로 이동시키기
          if (!session) {
            **return NextResponse.redirect("http://localhost:80/i/flow/login");**
          }
        }

        // See "Matching Paths" below to learn more
        export const config = {
          matcher: ["/compose/tweet", "/home", "/explore", "/messages", "/search"],
        };
        ```

     2. package.json 포트 수정

        ```json
        // package.json
        "scripts": {
            **"start": "next start -p 80",**
        }
        ```
  2. 인스턴스 연결
     1. 만들어진 인스턴스를 연결해준다.

        ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/c3497654-c10d-4365-8a41-9bb2aa31332d/Untitled.png)

        ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/375eef56-c4f2-4069-8a2e-df37797cfe7c/Untitled.png)
  3. node 설치

     [How To Install Node.js on Ubuntu 22.04 | DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-22-04#option-3-installing-node-using-the-node-version-manager)

     1. 여러가지 방법이 있지만 그 중 Option3 방법을 추천!

     ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/9167b2b4-02c2-45e3-a295-f98f303440cf/Untitled.png)

     ```bash
     $ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
     ```

     ```bash
     $ source ~/.bashrc
     ```

     ```bash
     $ nvm install v20 # 현재 node v20이 LTS 버전
     ```

  4. git clone 및 패키지 설치

     ```bash
     $ git clone [git 레파지토리 주소]
     ```

     ```bash
     $ cd [레파지토리 폴더]
     ```

     ```bash
     $ npm i
     ```

     ```bash
     $ npm i sharp # nextjs image optimization 성능이 더 좋아진다.

     # https://nextjs.org/docs/pages/building-your-application/deploying#image-optimization
     ```

     <aside>
     💡 **sharp에 대한 공식 문서 글**
     • When self-hosting, consider installing `sharp` for more performant [Image Optimization](https://nextjs.org/docs/pages/building-your-application/optimizing/images) in your production environment by running `npm install sharp` in your project directory. On Linux platforms, `sharp` may require [additional configuration](https://sharp.pixelplumbing.com/install#linux-memory-allocator) to prevent excessive memory usage.

     </aside>

  5. build 하기

     ```bash
     $ npm run build
     ```

     ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/ec4c0f5f-5680-4d78-ba56-67622dc47edf/Untitled.png)

     `.env` 파일을 만들지 않으면 위와 같은 오류가 발생할 수 있다.

     - .env 파일 만들기

     ```bash
     $ vim .env.production
     ```

     `.env.local` 에 있던 값 복사/붙여넣기 후 `:wq` 하여 저장 후 나오기

     이때 원래는 백엔드 서버 주소를 http://localhost:9090에서 배포된 백엔드 서버 주소로 바꿔주어야 한다.

     ```bash
     $ cat .env.production # .env파일 내용 보기 \
     ```

  6. 탄력적 IP 주소 할당
  - 기존 인스턴스에서는 IP가 매번 바뀌기 때문에 탄력적 IP 주소를 할당하여 IP를 고정시킬 수 있다.
  - IP가 바뀐다는 것은 접속할 때마다 접속 정보가 바뀐다는 의미이기 때문에 불편함을 야기한다.
  - 탄력적 IP도 유료화가 되어 할당하게 되면 요금이 부과된다.
  - IP 변경 후 인스턴스 연결이 제대로 동작하지 않을 수 있기 때문에 그땐 다시 인스턴스 연결 진
  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/49116c59-890b-468e-bf4e-9d34ca95c82a/Untitled.png)
  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/32836cd9-407a-4edd-805f-15bf0959ab12/Untitled.png)
  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/90220695-2169-4c86-b8c6-9d31d835f96f/Untitled.png)
  - 탄력적 IP 주소 연결
  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/93230837-152c-4e21-981b-9712062bab1f/Untitled.png)
  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/46d7c09e-c38d-48e9-b988-75328f161472/Untitled.png)
  9. 배포
  ```bash
  $ npm start
  ```
    <aside>
    💡 **permission denied 오류 해결**
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/3c4d4106-8064-4940-9cf7-337bd067f512/Untitled.png)
    
    ```bash
    $ sudo -s # root로 접속
    
    # npm, nvm 재설치
    $ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
    $ nvm install v20
    
    # 프로젝트 폴더로 이동 후 명령어 실행
    $ cd [프로젝트 폴더]
    $ npm start
    ```
    
    </aside>
    
    1. 탄력적 IP 주소로 접속하게 되면 배포된 프로젝트를 볼 수 있다.
        1. IP 주소로 접속하는 것이 불편하기 때문에 도메인 구매 후 연결을 하는 것
        2. 인스턴스 연결을 종료할 경우 해당 IP 접속이 안되기 때문에 추가적인 배포 지식이 필요하다.
    2. 이후 AWS 연결을 종료하고 싶다면 `인스턴스 상태 > 인스턴스 종료` , `탄력적 IP에서 작업 > 탄력적 주소 IP 릴리스`  진행
