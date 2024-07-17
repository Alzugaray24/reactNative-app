import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../databases/realtimeDataBase";

export const shopApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => `categories.json`,
    }),

    getProductsByCategory: builder.query({
      query: (category) =>
        `products.json?orderBy="category"&equalTo="${category}"`,
      transformResponse: (res) => {
        const transformedResponse = Object.values(res);
        return transformedResponse;
      },
    }),

    getProductById: builder.query({
      query: (productId) => `products.json?orderBy="id"&equalTo=${productId}`,
      transformResponse: (res) => {
        const transformedResponse = Object.values(res);
        if (transformedResponse.length) return transformedResponse[0];
      },
    }),

    getOrdersByUser: builder.query({
      query: (user) => `orders.json?orderBy="user"&equalTo="${user}"`,
      transformResponse: (res) => {
        const transformedResponse = Object.values(res);
        return transformedResponse;
      },
    }),

    postCartItem: builder.mutation({
      query: (cartItem) => ({
        url: `cart.json`,
        method: `POST`,
        body: cartItem,
      }),
      transformResponse: (res) => {
        const transformedResponse = Object.values(res);
        if (transformedResponse.length) return transformedResponse[0];
      },
    }),

    getCartItemsByUser: builder.query({
      query: (user) => `cart.json?orderBy="user"&equalTo="${user}"`,
      transformResponse: (res) => {
        const transformedResponse = Object.values(res);
        return transformedResponse.length ? transformedResponse : [];
      },
    }),

    removeCartItemById: builder.mutation({
      query: ({ itemId }) => ({
        url: `cart/${itemId}.json`,
        method: "DELETE",
      }),
    }),

    removeOrderById: builder.mutation({
      query: ({ orderId }) => ({
        url: `orders/${orderId}.json`,
        method: "DELETE",
      }),
    }),

    postOrder: builder.mutation({
      query: (order) => ({
        url: `orders.json`,
        method: `POST`,
        body: order,
      }),
      transformResponse: (res) => {
        const transformedResponse = Object.values(res);
        if (transformedResponse.length) return transformedResponse[0];
      },
    }),

    getProfileImage: builder.query({
      query: (localId) => `profileImages/${localId}.json`,
    }),

    postProfileImage: builder.mutation({
      query: ({ image, localId }) => ({
        url: `profileImages/${localId}.json`,
        method: "POST",
        body: {
          image: image,
        },
      }),
    }),
  }),
});

export const {
  useGetCartItemsByUserQuery,
  usePostCartItemMutation,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
  useGetProductByIdQuery,
  useGetOrdersByUserQuery,
  usePostOrderMutation,
  useGetProfileImageQuery,
  usePostProfileImageMutation,
  useRemoveCartItemByIdMutation,
} = shopApi;
