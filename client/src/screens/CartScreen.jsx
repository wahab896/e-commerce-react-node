import { useDispatch, useSelector } from "react-redux";
import QtyDropdown from "../components/QtyDropdown";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import { FaTrash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

const CartScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="mt-10 grid md:grid-cols-6 grid-cols-1 px-2 md:px-20 text-gray-500 gap-x-10">
      <div className="md:col-span-4">
        <h1 className="text-4xl font-semibold text-gray-500">Shopping cart</h1>
        {cartItems.length ? (
          <ProductTable cartItems={cartItems} />
        ) : (
          <h3 className="mt-4 p-4 border rounded-md border-blue-300 bg-blue-50 text-md font-normal text-blue-900">
            Your cart is empty{" "}
            <NavLink className="underline" to={`/`}>
              Go Back
            </NavLink>{" "}
          </h3>
        )}
      </div>
      <div className="md:col-span-2">
        <div className="border shadow-lg p-4 rounded-md border-gray-300 ">
          <div className="border-b-2">
            <h1 className="text-4xl font-semibold text-gray-500">
              Subtotal {cartItems.reduce((acc, item) => acc + item.qty, 0)}{" "}
              items
            </h1>
            <div className="py-2 mb-4">
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </div>
          </div>
          <button
            onClick={handleCheckout}
            disabled={!cartItems.length}
            className={`mt-4 p-2 text-gray-100 border rounded-md  ${
              cartItems.length
                ? "bg-gray-700 hover:bg-gray-800"
                : "bg-gray-600 cursor-not-allowed"
            }`}
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
export default CartScreen;

const ProductTable = ({ cartItems }) => {
  const dispatch = useDispatch();

  const handleQtyChange = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const handleRemoveClick = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div>
      {cartItems.map((item) => (
        <div
          key={item._id}
          className="grid md:grid-cols-6 grid-cols-4 md:text-center items-center p-4 border-b-2 last-of-type:border-b-0 max-md:gap-y-5"
        >
          <div className="md:col-span-1 col-span-4">
            <img
              className="aspect-auto object-fill"
              src={item.image}
              alt={item.name}
            />
          </div>
          <NavLink
            to={`/product/${item._id}`}
            className="md:col-span-2 col-span-3 underline text-slate-900"
          >
            {item.name}
          </NavLink>
          <div className="md:col-span-1 col-span-1 flex justify-center">
            ${item.price}
          </div>
          <QtyDropdown
            className="md:col-span-1 col-span-3"
            qty={item.qty}
            count={item.countInStock}
            onQtyChange={(e) => handleQtyChange(item, Number(e.target.value))}
          />
          <div className="md:col-span-1 col-span-1 flex justify-center">
            <button
              onClick={() => handleRemoveClick(item._id)}
              className="p-2.5 mr-2 hover:bg-slate-300 bg-slate-100 border rounded-sm"
            >
              <FaTrash className="text-black text-md" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
