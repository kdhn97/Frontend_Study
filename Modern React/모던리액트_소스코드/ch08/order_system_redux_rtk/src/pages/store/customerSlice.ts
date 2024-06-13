import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
export const customerSlice = createApi({
    reducerPath: 'customerApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/v1',
        prepareHeaders(headers) {
            return headers;
        } 
    }),
    tagTypes: ['Customer'],
    endpoints: (builder) => ({
        getCustomers: builder.query<Customers, void>({
            query: () => '/customers',
            providesTags: ['Customer']
        }),
        insertCustomer: builder.mutation({
            query: (customer: Customer) => ({
                url: '/customers',
                method: 'POST',
                body: customer
            }),
            invalidatesTags: ['Customer']
        }),
        updateCustomer: builder.mutation({
            query: (customer: Customer) => ({
                url: `/customers/${customer.id}`,
                method: 'PUT',
                body: customer
            }),
            invalidatesTags: ['Customer']
        }),
        deleteCustomer: builder.mutation({
            query: (id: number) => ({
                url: `/customers/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Customer']
        })
    })
});
export const { 
    useGetCustomersQuery, 
    useInsertCustomerMutation,
    useUpdateCustomerMutation,
    useDeleteCustomerMutation
} = customerSlice;
