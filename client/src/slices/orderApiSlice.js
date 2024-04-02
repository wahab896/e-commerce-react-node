import { ORDERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addNewOrders: builder.mutation({
      query: (data) => ({
        url: ORDERS_URL,
        method: "POST",
        body: data,
      }),
    }),
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getOrderById: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useAddNewOrdersMutation,
  useGetOrdersQuery,
  useGetOrderByIdQuery,
} = orderApiSlice;
