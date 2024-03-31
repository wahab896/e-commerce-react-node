import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../slices/cartSlice";

const ShippingScreen = () => {
  const { shippingAddress } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");
  const [city, setCity] = useState(shippingAddress.city || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitAddressHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, postalCode, country, city }));
    navigate("/payment");
  };
  return (
    <div className="lg:w-1/2 mx-auto px-5 md:px-20">
      <div className="mt-5 flex justify-center">
        <CheckoutSteps activeSteps={[0, 1]} />
      </div>
      <form onSubmit={submitAddressHandler} className="mt-5">
        <h1 className="text-4xl font-semibold text-gray-500">Shipping</h1>
        <div className="mt-4 flex flex-col gap-y-2">
          <div className="flex flex-col">
            <label className="text-gray-500 ">Address</label>
            <input
              className="mt-1 text-gray-500 border border-gray-400 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter Address"
              type="text"
              required
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-500">City</label>
            <input
              className="mt-1 text-gray-500 border border-gray-400 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter City"
              type="text"
              required
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-500 ">Postal Code</label>
            <input
              className="mt-1 text-gray-500 border border-gray-400 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter Postal Code"
              type="number"
              required
              value={postalCode}
              onChange={(e) => {
                setPostalCode(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-500 ">Confirm Country</label>
            <input
              className="mt-1 text-gray-500 border border-gray-400 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter Country"
              type="text"
              required
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
            />
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

export default ShippingScreen;
