import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  useCreateReviewMutation,
  useGetProductByIdQuery,
} from "../slices/productApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import Ratings from "../components/Ratings";
import Loader from "../components/Loader";
import ErrorBox from "../components/ErrorBox";
import { addToCart } from "../slices/cartSlice";
import QtyDropdown from "../components/QtyDropdown";

const ProductScreen = () => {
  const { id } = useParams();
  const { data: product, isLoading, error, refetch } = useGetProductByIdQuery({
    id,
  });

  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleQtyChange = (e) => {
    setQty(Number(e.target.value));
  };

  const handleAddToCart = (e) => {
    //Adding of cart and navigating to next screen with saved state.
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const isCountInStock = () => {
    if (product) {
      return product.countInStock > 0;
    }
  };

  const loadOrError = isLoading ? (
    <Loader />
  ) : error ? (
    <ErrorBox msg={error?.data?.message || error?.error} />
  ) : (
    false
  );

  return (
    loadOrError || (
      <div className="grid md:grid-cols-4 grid-cols-1 gap-5 px-2 md:px-20 text-gray-500">
        <div className="mt-10 col-span-full">
          <NavLink
            className="p-3 bg-slate-200 hover:bg-slate-300 border rounded-md"
            to="/"
          >
            Go Back
          </NavLink>
        </div>
        <img className="md:col-span-2" src={product.image} alt={product.name} />
        <div className="md:col-span-1 text-gray-500 text-md">
          <h2 className="text-2xl font-semibold text-gray-500">
            {product.name}
          </h2>
          <hr className="my-4 h-[1px] bg-gray-300" />
          <Ratings
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
          <hr className="my-4 h-[1px] bg-gray-300" />
          <div>Price ${product.price}</div>
          <hr className="my-4 h-[1px] bg-gray-300" />
          <div>Description: {product.description}</div>
        </div>
        <div className="col-span-1">
          <div className="shadow-lg border rounded-md border-gray-300">
            <div className="grid grid-cols-2 p-4 border-b border-b-gray-300">
              <div>Price:</div>
              <div>${product.price}</div>
            </div>
            <div className="grid grid-cols-2 p-4 border-b border-b-gray-300">
              <div>Status:</div>
              <div> {isCountInStock() ? "In Stock" : "Out Of Stock"}</div>
            </div>
            {isCountInStock() && (
              <div className="grid grid-cols-2 p-4 border-b border-b-gray-300">
                <div>Qty</div>
                <QtyDropdown
                  qty={qty}
                  onQtyChange={handleQtyChange}
                  count={product.countInStock}
                />
              </div>
            )}
            <button
              onClick={handleAddToCart}
              disabled={!isCountInStock()}
              className={`m-4 p-2 text-gray-100 border rounded-md ${
                isCountInStock()
                  ? "bg-gray-700 hover:bg-gray-800"
                  : "cursor-not-allowed bg-gray-600"
              }`}
            >
              Add To Cart
            </button>
          </div>
        </div>
        <div className="md:col-span-2 flex flex-col gap-y-6">
          <h2 className="p-2 border rounded-sm border-gray-300 bg-gray-50 text-2xl font-semibold text-gray-500">
            Reviews
          </h2>
          {product.reviews?.length ? (
            <ListCustomerReviews reviews={product.reviews} />
          ) : (
            <h3 className="p-2 border rounded-md border-blue-300 bg-blue-50 text-md font-medium text-blue-900">
              No Reviews
            </h3>
          )}
          <AddReviews productId={id} refetch={refetch} />
        </div>
      </div>
    )
  );
};
export default ProductScreen;

const ListCustomerReviews = ({ reviews }) => {
  return (
    <ul className="max-h-72 overflow-auto px-5 text-gray-500">
      {reviews.map((r) => (
        <li className="flex flex-col mb-2 border-b-2" key={r._id}>
          <h3 className="text-lg font-semibold">{r.name}</h3>
          <Ratings value={r.rating} />
          <span className="text-sm font-normal">
            {r.createdAt.substring(0, 10)}
          </span>
          <span className="py-2 text-md font-normal">{r.comment}</span>
        </li>
      ))}
    </ul>
  );
};

const AddReviews = ({ productId, refetch }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const [
    createReview,
    { isLoading: loadingReview },
  ] = useCreateReviewMutation();

  const handleSubmitReview = async () => {
    try {
      if (!rating || !comment) {
        throw new Error("Rating or Comment is not provided");
      }
      const response = await createReview({
        rating,
        comment,
        productId,
      }).unwrap();
      refetch();
      toast.success(response.message);
      setRating("");
      setComment("");
    } catch (err) {
      toast.error(err?.data?.message || err?.message || err?.Error);
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="p-2 border border-gray-300 border-sm bg-gray-50 text-2xl font-semibold text-gray-500">
        Write a Customer Review
      </h2>
      {loadingReview && <Loader />}
      {userInfo ? (
        <div className="mt-2 flex flex-col gap-2">
          <label htmlFor="customer-reviews">Rating</label>
          <select
            className="p-2 appearance-none border border-gray-400 focus:ring focus:outline-none focus:ring-gray-300 rounded-md"
            name="customer-reviews"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="">Select rating</option>
            <option value="1">1. Poor</option>
            <option value="2">2. Fair</option>
            <option value="3">3. Good</option>
            <option value="4">4. Very Good</option>
            <option value="5">5. Excellent</option>
          </select>
          <label htmlFor="">Comment</label>
          <textarea
            className="min-h-[40px] border rounded-md border-gray-400 focus:ring focus:ring-gray-300 focus:outline-none"
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button
            onClick={handleSubmitReview}
            disabled={loadingReview}
            className="my-4 p-2 self-start text-gray-100 border rounded-md bg-gray-700 hover:bg-gray-800"
          >
            Submit Review
          </button>
        </div>
      ) : (
        <h3 className="mt-2 p-2 border rounded-md border-blue-300 bg-blue-50 text-md font-normal text-blue-900">
          Please{" "}
          <NavLink
            className="underline"
            to={`/login?redirect=product/${productId}`}
          >
            sign in
          </NavLink>{" "}
          to add a review
        </h3>
      )}
    </div>
  );
};
