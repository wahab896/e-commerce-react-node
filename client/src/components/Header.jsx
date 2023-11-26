import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FaList, FaShoppingCart } from "react-icons/fa";
import Search from "./Search";
import NavTabs from "./NavTabs";

const Header = () => {
  const [expanded, setExpanded] = useState(false);
  const onToggle = () => {
    setExpanded(!expanded);
  };
  return (
    <nav className="w-full bg-gray-700 p-3">
      <div className="flex justify-between px-5">
        <button>Logo</button>
        <Search />
        <NavTabs />
        <button
          onClick={onToggle}
          className="md:hidden rounded-3xl border-yellow-400 p-4 bg-blue-400  hover:bg-blue-500"
        >
          <FaList />
        </button>
        {expanded && (
          <div className="md:hidden sm:flex sm:flex-col mt-4 flex flex-col gap-4 px-28">
            <Search />
            <NavTabs />
          </div>
        )}
      </div>
    </nav>
  );
};
export default Header;
