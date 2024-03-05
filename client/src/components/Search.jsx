import { FaSearch } from "react-icons/fa";

const Search = () => {
  return (
    <div className="flex bg-gray-100 rounded-2xl md:w-auto w-full">
      <input
        type="text"
        placeholder="Search Products..."
        className="w-full rounded-2xl px-3 bg-gray-100 border-0 outline-none text-gray-500"
      />
      <button className="bg-gray-900 hover:bg-gray-800 rounded-e-2xl px-3 py-3">
        <FaSearch className="text-gray-100" />
      </button>
    </div>
  );
};
export default Search;
