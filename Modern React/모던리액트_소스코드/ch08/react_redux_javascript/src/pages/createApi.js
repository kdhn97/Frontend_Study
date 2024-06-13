import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// const api = createApi({
//     baseQuery: () => {},
//     endpoints: (build) => ({
//         todos: build.query({
//             async queryFn() {
//                 const response = await fetch("http://localhost:8000/api/v1/todos");
//                 if(response.ok) {
//                     const data = await response.json();
//                     return {data};
//                 } else {
//                     return {error: "읽는 중 에러가 발생했습니다."};
//                 }
//             }
//         })
//     }),
// });
const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/v1"
    }),
    endpoints: (build) => ({
        todos: build.query({
            query() {
                return {
                    url: "/todos",
                    method: "GET"
                }
            }
        })
    }),
});
export const { useTodosQuery } = api;
export default api;

