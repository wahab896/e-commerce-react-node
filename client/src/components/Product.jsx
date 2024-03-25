import { NavLink } from "react-router-dom";
const Product = ({ product }) => {
  const convertToFloat = (val) => {
    return Number(val).toFixed(2);
  };
  return (
    <div className="product flex flex-col border-solid border-gray-300 rounded-md border p-5 shadow-lg shadow-gray-500/50 hover:shadow-gray-500/70">
      <NavLink to={`/product/${product._id}`}>
        <img className="aspect-square" src={product.image} alt={product.name} />
      </NavLink>
      <div className="flex flex-col py-5">
        <NavLink
          className="inline text-l font-semibold truncate "
          to={`/product/${product._id}`}
        >
          {product.name}
        </NavLink>
        <Rating />
        <div className="text-2xl font-semibold text-gray-500">
          ${convertToFloat(product.price)}
        </div>
      </div>
    </div>
  );
};
export default Product;

const Rating = () => {
  return <div className="mt-2">Stars and Reviews</div>;
};
