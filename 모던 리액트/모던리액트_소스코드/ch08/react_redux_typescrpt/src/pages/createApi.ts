import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/v1"
    }),
    tagTypes: ['Todo'],
    endpoints: (build) => ({
        todos: build.query<Todos, void>({
            query() {
                return {
                    url: "/todos",
                    method: "GET"
                }
            },
            providesTags: ['Todo']
        }),
        insert: build.mutation({
            query: (todo: Todo) => ({
                url: "/todos",
                method: "POST",
                body: todo
            }),
            invalidatesTags: ['Todo']
        })
    }),
});

export const { useTodosQuery, useInsertMutation } = api;
export default api;

