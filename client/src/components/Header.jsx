import { NavLink } from "react-router-dom";
import { useState } from "react";
import Search from "./Search";
import NavTabs from "./NavTabs";

const Header = () => {
  return (
    <header className="w-full bg-gray-700 p-3">
      <div className="flex justify-between px-5">
        <NavLink to="/">
          <span className="text-gray-300">Logo</span>
        </NavLink>
        <Search />
        <NavTabs />
      </div>
    </header>
  );
};
export default Header;
