import { NavLink, useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../slices/orderApiSlice";
import Loader from "../components/Loader";
import ErrorBox from "../components/ErrorBox";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const { data: order, isLoading, error } = useGetOrderByIdQuery(orderId);

  const loadOrError = isLoading ? (
    <Loader />
  ) : error ? (
    <ErrorBox msg={error?.data?.message || error?.error} />
  ) : (
    false
  );

  return (
    loadOrError || (
      <div className="px-5 md:px-20">
        <div className="mt-10 grid md:grid-cols-6 grid-cols-1 text-gray-500 gap-x-10">
          <h1 className="pb-4 md:col-span-6 grid-cols-1 text-4xl font-semibold text-gray-500">
            Order {order._id}
          </h1>
          <div className="md:col-span-4 flex flex-col gap-y-6 divide-y-2 pt-4">
            <div className="flex flex-col gap-y-2.5 ">
              <h1 className="text-3xl font-semibold text-gray-500">Shipping</h1>
              <div>
                <h2 className="inline font-semibold text-gray-500">Name:</h2>{" "}
                <span>{order.user.name}</span>
              </div>
              <div>
                <h2 className="inline font-semibold text-gray-500">Email:</h2>{" "}
                <a
                  className="text-slate-900 underline"
                  href={`mail.to:${order.user.email}`}
                >
                  {order.user.email}
                </a>
              </div>
              <div>
                <h2 className="inline font-semibold text-gray-500">Address:</h2>{" "}
                <span>
                  {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-y-2.5 pt-4">
              <h1 className="text-3xl font-semibold text-gray-500">
                Payment Method
              </h1>
              <div>
                <h2 className="inline font-semibold text-gray-500">Method:</h2>{" "}
                <span>{order.paymentMethod}</span>
              </div>
            </div>
            <div className="flex flex-col gap-y-2.5 pt-4">
              <h1 className="text-3xl font-semibold text-gray-500">
                Order Items
              </h1>
              <div className="px-2">
                {order.orderItems.map((item) => {
                  return (
                    <div
                      key={item._id}
                      className="grid md:grid-cols-7 items-center border-b-2 last-of-type:border-0 py-2.5"
                    >
                      <div className="md:col-span-1 flex p-1 items-center">
                        <img
                          className="aspect-auto object-fill h-10 w-12 "
                          src={item.image}
                          alt={item.name}
                        />
                      </div>
                      <NavLink
                        to={`/product/${item._id}`}
                        className="md:col-span-4 underline text-slate-900"
                      >
                        {item.name}
                      </NavLink>
                      <div className="md:col-span-2 text-base">
                        {item.qty} X ${item.price} = $
                        {(item.qty * item.price).toFixed(2)}{" "}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="flex flex-col justify-self-end divide-y-2 border shadow-lg p-4 rounded-md border-gray-300 ">
              <h1 className="pb-8 text-3xl font-semibold text-gray-500">
                Order Summary
              </h1>
              <div className="pr-10 py-2 flex justify-between items-center">
                <span>Items</span>
                <span>${order.itemsPrice}</span>
              </div>
              <div className="pr-10 py-2 flex justify-between items-center">
                <span>Shipping</span>
                <span>${order.shippingPrice}</span>
              </div>
              <div className="pr-10 py-2 flex justify-between items-center">
                <span>Tax</span>
                <span>${order.taxPrice}</span>
              </div>
              <div className="pr-10 py-2 flex justify-between items-center">
                <span>Total</span>
                <span>${order.totalPrice}</span>
              </div>
              <span></span>
              <button
                // onClick={submitPaymentHandler}
                disabled={!order.orderItems.length || isLoading}
                className={`mt-4 p-2 self-start text-gray-100 border rounded-md  ${
                  order.orderItems.length
                    ? "bg-gray-700 hover:bg-gray-800"
                    : "bg-gray-600 cursor-not-allowed"
                }`}
              >
                Place Order
              </button>
              {loadOrError}
            </div>
          </div>
        </div>
      </div>
    )
  );
};
export default OrderScreen;
