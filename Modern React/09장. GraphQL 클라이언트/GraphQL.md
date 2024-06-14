# GraphQL 클라이언트

### GraphQL (Graph Query Lanquage) 개요

- Rest API를 대체할 수 있는 효율적이고 유연한 기능 제공
- Rest API는 여러 개의 엔드포인트를 제공하지만, GraphQL은 단 하나의 엔드포인트만 제공

- 스키마(Schema)

  - 클라이언트와 서버 사이의 커뮤니케이션에 필요한 계약 사항을 정의

  1. 타입을 정의

  ```TSX
    type Customer {
    // Null 값을 반환할 수 없는 필수 속성에는 타입 뒤에 ! 붙임
      id: ID! // ID 스칼라 타입 - 유일한 식별자를 표현하는 Key
      name: String!
      address : String!
      email : String!
    }
    type Order {
      id: ID!
      data: Date // 커스텀 스칼라 타입은 scala Data;로 사용 가능
      items: [OrderItem] // 목록 타입은 [대괄호] 안에 둔다
    }
  ```

  2. 클라이언트가 수행할 수 있는 행위 유형

  - 질의(Query) - 데이터를 가져오는 행위 수행 (요청)
    ```TSX
      type Query {
        customer: [Customer]
        customer(id: ID!): Customer
        order(id: ID!): Order
        ordersByCustomer(id: ID!): [Order]
      }
    ```
  - 뮤테이션(Mutation) - 서버 측의 데이터를 수정하는 행위 수행 (생성, 변경, 삭제)
    ```TSX
      type Mutation {
        createCustomer(name: String!, address: String!, email: String!): Customer!
        updateCustomer(id: ID!, name: String, address: String, email: String): Customer!
        deleteCustomer(id: ID!): ID!
        purchaseOrder(customer: ID!, items: [itemInput]!): Order!
        cancleOrder(id: ID!): ID!
      }
    ```

### GraphQL 질의 구문

1. 고객관련 질의

```TSX
  query {
    질의필드명([매개변수: 인수값, ...]) {
      결과필드 목록
    }
  }
```

```TSX
// ex) customers 필드는 매개변수가 없고 고객정보 목록을 반환
// query는 디폴드라서 생략 가능
  query {
    customers {
      id, name, address, email
    }
  }
```

- GraphQL 장점 : 질의의 유연성
  - 특정한 필드만 가져오도록 제한할 수 있다
  ```TSX
  // ex) customers 필드에서 name 필드만 가져오기
  query {
    customers {
      name
    }
  }
  ```

2. 뮤테이션 필드

```TSX
// mutation은 필수이므로 생략 불가
  mutation {
    뮤테이션 필드명([매개변수: 인수값, ...]) {
      결과필드 목록
    }
  }
```

```TSX
  mutation {
    createCustomer(name: '김사', address: '제주도', email: 'kim4@gamil.com') {
        name, address, email, id
      }
  }
```

```TSX
// id 값만 반환
  mutation {
    createCustomer(name: '김오', address: '인천시', email: 'kim5@gamil.com') {
        id
      }
  }
```

### GraphQL 질의 구현
<!-- 소스코드 ch09 -->

### 아폴로 클라이언트 질의
- GraphQL 클라이언트 라이브러리 : <mark> Apollo Client </mark>
- 모듈 설치 : npm install graphql @apollo/client

```TSX
// 파일명 : index.tsx
  import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'

  const client = new ApolloClient({
    uri: 'http://localhost:3001/graphql',
    cache: new InMemoryCache(),
  })
  export default function Home() {
    return (
      <ApolloProvider client={client}></ApolloProvider>
    )
  }
```

- @graphql-codegen/cli : graphQL 스키마에서 타입스크립트를 생성
  - 설치 : npm install --save-dev @graphql-codegen/cli @graphql-codegen/client-preset
  - 명령 : npm run generate