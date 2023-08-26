import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { EXPO_PUBLIC_REALTIME_DB_URL } from "@env"

const realtime_database_url = EXPO_PUBLIC_REALTIME_DB_URL

export const shopApi = createApi({
    reducerPath: 'shopApi',
    baseQuery: fetchBaseQuery({ baseUrl: realtime_database_url }),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => `krusty_categories.json`
        }),
        getProducts: builder.query({
            query: () => `krusty_products.json`
        }),
        getProductsByCategory: builder.query({
            query: (category) => `products.json?orderBy="category"&equalTo="${category}"`,
            transformResponse: (response) => {
                const productsTransformed = Object.values(response)
                return (productsTransformed)
            }
        }),
        getProductById: builder.query({
            query: (productId) => `products.json?orderBy="id"&equalTo=${productId}`,
            transformResponse: (response) => {
                const productTransformed = Object.values(response).pop()
                return (productTransformed)
            }
        }),
        getCartHistory: builder.query({
            query: (userId) => `krusty_orders.json?orderBy="userId"&equalTo=${userId}`,
            transformResponse: (response) => {
                const productTransformed = Object.values(response).pop()
                return (productTransformed)
            }
        }),
        postCart: builder.mutation({
            query: (order) => ({
                url: `krusty_orders.json`,
                method: `POST`,
                body: order
            })
        }),
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
            try {
                const result = await queryFulfilled;
                dispatch(result);
            } catch (error) {
                dispatch(error);
            }
        },
    })
})

export const {
    useGetCategoriesQuery,
    useGetProductsQuery,
    useGetProductsByCategoryQuery,
    useGetProductByIdQuery,
    useGetCartHistoryQuery,
    usePostCartMutation,
} = shopApi