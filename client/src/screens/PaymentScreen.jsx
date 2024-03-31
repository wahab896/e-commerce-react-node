import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../slices/cartSlice";
import { useEffect, useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = () => {
  const { shippingAddress } = useSelector((state) => state.cart);
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const paypalId = useId();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  const submitPaymentHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };
  return (
    <div className="lg:w-1/2 mx-auto px-5 md:px-20">
      <div className="mt-5 flex justify-center">
        <CheckoutSteps activeSteps={[0, 1, 2]} />
      </div>
      <form onSubmit={submitPaymentHandler} className="mt-5">
        <h1 className="text-4xl font-semibold text-gray-500">Payment Method</h1>
        <h2 className="text-xl font-semibold text-gray-500">Select Method</h2>
        <div className="mt-4 flex flex-col gap-y-2">
          <div className="flex items-center text-center">
            <input
              type="radio"
              name="payment_method"
              id={paypalId}
              value={"PayPal"}
              checked={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="focus:outline-none focus:ring focus:border-blue-500"
            />
            <label htmlFor={paypalId} className="text-gray-500 ml-2">
              PayPal or Credit Card
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="mt-2 p-2 text-gray-100 border rounded-md bg-gray-700 hover:bg-gray-800"
        >
          Continue
        </button>
      </form>
    </div>
  );
};
export default PaymentScreen;
