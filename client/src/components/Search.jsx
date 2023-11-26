import { FaSearch } from "react-icons/fa";

const Search = () => {
  return (
    <div className="flex bg-gray-100 rounded-2xl">
      <input
        type="text"
        placeholder="Search Here..."
        className="w-full rounded-2xl px-3 bg-gray-100 border-0 outline-none"
      />
      <button className="bg-blue-400 hover:bg-blue-500 rounded-e-2xl px-3 py-4">
        <FaSearch />
      </button>
    </div>
  );
};
export default Search;
