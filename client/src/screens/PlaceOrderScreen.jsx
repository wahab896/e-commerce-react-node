import { useDispatch, useSelector } from "react-redux";
import { useEffect, useId, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { useAddNewOrdersMutation } from "../slices/orderApiSlice";
import { toast } from "react-toastify";

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [addNewOrder, { isLoading, error }] = useAddNewOrdersMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [navigate, cart.shippingAddress.address, cart.paymentMethod]);

  const submitPaymentHandler = async (e) => {
    try {
      const res = await addNewOrder({
        orderItems: cart.cartItems,
        paymentMethod: cart.paymentMethod,
        shippingAddress: cart.shippingAddress,
        itemsPrice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err?.data?.message || err?.Error || err?.message);
    }
  };
  return (
    <div className="px-5 md:px-20">
      <div className="mt-5 flex justify-center">
        <CheckoutSteps activeSteps={[0, 1, 2, 3]} />
      </div>
      <div className="mt-10 grid md:grid-cols-6 grid-cols-1 text-gray-500 gap-x-10">
        <div className="md:col-span-4 flex flex-col gap-y-6 divide-y-2 pt-4">
          <div className="flex flex-col gap-y-2.5 ">
            {" "}
            <h1 className="text-4xl font-semibold text-gray-500">Shipping</h1>
            <div>
              <h2 className="inline font-semibold text-gray-500">Address:</h2>{" "}
              <span>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-y-2.5 pt-4">
            <h1 className="text-4xl font-semibold text-gray-500">
              Payment Method
            </h1>
            <div>
              <h2 className="inline font-semibold text-gray-500">Method:</h2>{" "}
              <span>{cart.paymentMethod}</span>
            </div>
          </div>
          <div className="flex flex-col gap-y-2.5 pt-4">
            <h1 className="text-4xl font-semibold text-gray-500">
              Order Items
            </h1>
            <div className="px-2">
              {cart.cartItems.map((item) => {
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
            <h1 className="pb-8 text-4xl font-semibold text-gray-500">
              Order Summary
            </h1>
            <div className="pr-10 py-2 flex justify-between items-center">
              <span>Items</span>
              <span>${cart.itemsPrice}</span>
            </div>
            <div className="pr-10 py-2 flex justify-between items-center">
              <span>Shipping</span>
              <span>${cart.shippingPrice}</span>
            </div>
            <div className="pr-10 py-2 flex justify-between items-center">
              <span>Tax</span>
              <span>${cart.taxPrice}</span>
            </div>
            <div className="pr-10 py-2 flex justify-between items-center">
              <span>Total</span>
              <span>${cart.totalPrice}</span>
            </div>
            <span></span>
            <button
              onClick={submitPaymentHandler}
              disabled={!cart.cartItems.length}
              className={`mt-4 p-2 self-start text-gray-100 border rounded-md  ${
                cart.cartItems.length
                  ? "bg-gray-700 hover:bg-gray-800"
                  : "bg-gray-600 cursor-not-allowed"
              }`}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PlaceOrderScreen;
