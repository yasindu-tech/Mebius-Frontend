
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Api = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({
    
    //baseUrl: "http://localhost:5000/api/",
    baseUrl: "https://mebius-backend-yasindug.onrender.com/api/",
    prepareHeaders: async (headers, { getState }) => {
      const token = await window.Clerk?.session?.getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `products`,
    }),
    createProduct: builder.mutation({
      query: (body) => ({
        url: `products`,
        method: "POST",
        body,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
    }),
    getProduct: builder.query({
      query: (id) => `products/${id}`,
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `products/${id}`,
        method: "PUT",
        body,
      }),
    }),
    getCategories: builder.query({
      query: () => `categories`,
    }),
    createCategory: builder.mutation({
      query: (body) => ({
        url: `categories`,
        method: "POST",
        body,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `categories/${id}`,
        method: "DELETE",
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `categories/${id}`,
        method: "PUT",
        body,
      }),
    }),
    getOrders: builder.query({
      query: () => `orders/all`,
    }),
    getOrder: builder.query({
      query: (id) => `orders/${id}`,
    }),
    getOrderByUser: builder.query({
      query: () => `orders/user`,
    }),
    createOrder: builder.mutation({
      query: (body) => ({
        url: `orders`,
        method: "POST",
        body,
      }),
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `users/${userId}`,
        method: "DELETE",
      }),
    }),
    getUser: builder.mutation({
      query: (userId) => ({
        url: `user/${userId}`,
        method: "GET",
      }),
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, orderStatus }) => ({
        url: `orders/${id}`,
        method: "PUT",
        body: { orderStatus },
      }),
    }),
    createCheckoutSession: builder.mutation({
      query: (body) => ({
        url: "payment/create-checkout-session",
        method: "POST",
        body,
      }),
    }),
      
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetCategoriesQuery,
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetOrderQuery,
  useGetOrderByUserQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useDeleteUserMutation, 
  useGetUserMutation,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useUpdateOrderStatusMutation,
  useCreateCheckoutSessionMutation,
} = Api;
