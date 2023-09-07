import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

export const sliceApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({ baseUrl: "https://backend-for-final-project-garden.onrender.com/" }),
  endpoints: (builder) => ({
    getAllСategories: builder.query({
      query: () => `categories/all`,
    }),
    getProductsByCategory: builder.query({
      query: (id) => `categories/${id}`,
    }),
    getSingleProduct: builder.query({
      query: (id) => `products/${id}`,
    }),
    getAllProducts: builder.query({
      query: () => `/products/all`,
    }),
    postPhoneNumberForDiscount: builder.mutation({
      query: (payload) => ({
        url: `/sale/send`,
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "aplication/json",
        },
      }),
      invalidatesTags: ['PhoneNumber'],
    }),
    postOrder: builder.mutation({
        query: (payload) => ({
          url: `/order/send`,
          method: "POST",
          body: payload,
          headers: {
            "Content-type": "aplication/json",
          },
        }),
        invalidatesTags: ['Order'],
      }),
  }),
});

export const {
  useGetAllСategoriesQuery,
  useGetProductsByCategoryQuery,
  useGetSingleProductQuery,
  useGetAllProductsQuery,
  usePostPhoneNumberForDiscountMutation,
  usePostOrderMutation
} = sliceApi;
