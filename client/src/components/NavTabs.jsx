import { NavLink } from "react-router-dom";
import { FaShoppingCart, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";

const NavTabs = () => {
  const [expanded, setExpanded] = useState(false);
  const onToggle = (val) => {
    setExpanded(val);
  };
  return (
    <div className="flex justify-between gap-12 items-center content-center text-gray-300">
      <NavLink className="flex hover:underline" to="/profile">
        <FaShoppingCart className="inline m-1" />
        Cart
      </NavLink>
      <button
        className="relative"
        onClick={() => {
          onToggle(!expanded);
        }}
      >
        <FaUserCircle className="rounded inline m-1 text-xl" />
        {expanded && (
          <div className="absolute bg-gray-900 shadow-lg rounded-md right-0 px-3">
            <ul
              onClick={() => onToggle(false)}
              className="flex flex-col gap-y-2 justify-evenly py-2"
            >
              <NavLink className="flex hover:underline" to="/profile">
                <FaUserCircle className="inline m-1" />
                Profile
              </NavLink>
              <NavLink className="flex hover:underline" to="/logout">
                <FaSignOutAlt className="inline m-1" />
                Logout
              </NavLink>
            </ul>
          </div>
        )}
      </button>
    </div>
  );
};
export default NavTabs;
