import { NavLink } from "react-router-dom";
import { FaShoppingCart, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";

const NavTabs = () => {
  const [expanded, setExpanded] = useState(false);
  const onToggle = (val) => {
    setExpanded(val);
  };
  return (
    <div className="flex justify-between gap-12 items-center content-center text-gray-300">
      <NavLink
        className={({ isActive }) =>
          `relative mx-2 ${isActive ? "underline" : "hover:underline "} `
        }
        to="/login"
        // onClick={() => {
        //   onToggle(!expanded);
        // }}
      >
        <FaUser className="inline m-1 text-gray-300 hover:text-gray-200 hover:cursor-pointer" />
        Sign In
        {/* {expanded && (
          <div className="absolute bg-gray-900 shadow-lg rounded-md right-0 px-3">
            <ul
              onClick={() => onToggle(false)}
              className="flex flex-col gap-y-2 justify-evenly py-2"
            >
              <NavLink className="flex hover:underline" to="/profile">
                <FaUser className="inline m-1" />
                Profile
              </NavLink>
              <NavLink className="flex hover:underline" to="/logout">
                <FaSignOutAlt className="inline m-1" />
                Logout
              </NavLink>
            </ul>
          </div>
        )} */}
      </NavLink>
    </div>
  );
};
export default NavTabs;
