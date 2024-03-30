const QtyDropdown = ({ className, count, onQtyChange, qty }) => {
  return (
    <select
      className={
        "p-2 appearance-none border border-gray-400 focus:ring focus:outline-none focus:ring-gray-300 rounded-md " +
        className
      }
      name="qty-dropdown"
      onChange={onQtyChange}
      value={qty}
    >
      {[...Array(count).keys()].map((c) => {
        return (
          <option value={c + 1} key={c}>
            {c + 1}
          </option>
        );
      })}
    </select>
  );
};

export default QtyDropdown;
