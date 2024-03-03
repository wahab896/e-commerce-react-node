const Product = ({ product }) => {
  const convertToFloat = (val) =>{
    return Number(val).toFixed(2)
  };
  return (
    <div className="product flex flex-col border-solid border-gray-300 rounded-md border p-5 shadow-lg shadow-gray-500/50 hover:shadow-gray-500/70">
      <img
        className="md:h-60 h-80 w-full hover:cursor-pointer"
        src={product.image}
        alt={product.title}
      />
      <div className="flex flex-col py-5">
        <div className="inline text-xl font-semibold truncate hover:cursor-pointer">
          {product.title}
        </div>
        <Rating />
        <div className="text-2xl text-gray-500">${convertToFloat(product.price)}</div>
      </div>
    </div>
  );
};
export default Product;

const Rating = () => {
  return <div className="mt-2">Stars and Reviews</div>;
};
