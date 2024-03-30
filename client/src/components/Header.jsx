import { NavLink } from "react-router-dom";
import { FaBars, FaCircle, FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import Search from "./Search";
import NavTabs from "./NavTabs";
import { useSelector } from "react-redux";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const [openNav, setOpenNav] = useState(false);
  return (
    <header>
      <nav className="w-full bg-gray-700">
        <div className="container px-5 md:px-20 py-3 flex flex-wrap justify-between mx-auto items-center relative">
          <NavLink to="/">
            <span className="text-gray-300">Logo</span>
          </NavLink>
          <button
            onClick={() => {
              console.log();
              setOpenNav(!openNav);
            }}
            className="relative border border-gray-300 p-2 rounded-md ml-auto md:hidden"
          >
            <FaBars className="text-gray-300 text-2xl" />
          </button>
          <div
            className={
              (openNav
                ? "max-md:flex max-md:flex-col max-md:basis-full max-md:grow"
                : "hidden") +
              ` md:ml-auto md:flex md:flex-row md:h-auto items-center transition-all ease-in-out duration-200 justify-center text-gray-300 gap-2 max-md:py-3`
            }
          >
            <Search />
            <NavLink
              className={({ isActive }) =>
                `flex ${isActive ? "text-gray-300" : "text-gray-400"}`
              }
              to="/cart"
            >
              <FaShoppingCart className="inline m-1" />
              Cart{" "}
              {cartItems.length > 0 && (
                <span className="mx-1 px-2 py-1 text-xs font-bold text-center bg-teal-600 rounded-l-full rounded-r-full">
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </span>
              )}
            </NavLink>
            <NavTabs />
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;
