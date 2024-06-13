import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api/v1',
        prepareHeaders(headers) {
            return headers;
        } 
    }),
    tagTypes: ['Todo'],
    endpoints: (builder) => ({
        getTodos: builder.query<Todos, void>({
            query: () => '/todos',
            providesTags: ['Todo']
        }),
        insertTodo: builder.mutation({
            query: (todo: Todo) => ({
                url: '/todos',
                method: 'POST',
                body: todo
            }),
            invalidatesTags: ['Todo']
        }),
        updateTodo: builder.mutation({
            query: (todo: Todo) => ({
                url: `/todos/${todo.id}`,
                method: 'PUT',
                body: todo
            }),
            invalidatesTags: ['Todo']
        }),
        deleteTodo: builder.mutation({
            query: (id: number) => ({
                url: `/todos/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Todo']
        })
    })
});
export const { 
    useGetTodosQuery, 
    useInsertTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation
} = apiSlice;
