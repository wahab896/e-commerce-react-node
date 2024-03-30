import { NavLink, useNavigate } from "react-router-dom";
import { FaUser, FaCaretDown, FaCaretUp } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import { logout } from "../slices/authSlice";

const ProfileItems = () => {
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      //Clearing of cart pending
      navigate("/login");
    } catch (err) {
      toast.err(err?.data?.message || err?.error);
    }
  };
  return (
    <>
      <NavLink
        className={({ isActive }) =>
          `block p-2 ${isActive ? "bg-gray-600" : "hover:bg-gray-600"}`
        }
        to="/profile"
      >
        Profile
      </NavLink>
      <li onClick={handleLogout} className="p-2 list-none hover:bg-gray-600 ">
        Logout
      </li>
    </>
  );
};

const AdminItems = () => {
  return (
    <>
      <NavLink
        to="/admin/productlist"
        className={({ isActive }) =>
          `block p-2 ${isActive ? "bg-gray-600" : "hover:bg-gray-600"}`
        }
      >
        Products
      </NavLink>
      <NavLink
        to="/admin/orderlist"
        className={({ isActive }) =>
          `block p-2 ${isActive ? "bg-gray-600" : "hover:bg-gray-600"}`
        }
      >
        Orders
      </NavLink>
      <NavLink
        to="/admin/userlist"
        className={({ isActive }) =>
          `block p-2 ${isActive ? "bg-gray-600" : "hover:bg-gray-600"}`
        }
      >
        Users
      </NavLink>
    </>
  );
};

const NavTabs = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="flex flex-col md:flex-row justify-between items-center content-center">
      {userInfo ? (
        <NavDropDown text={userInfo.name}>
          <ProfileItems />
        </NavDropDown>
      ) : (
        <NavLink
          className={({ isActive }) =>
            `relative mx-2 ${isActive ? "text-gray-300" : "text-gray-400"} `
          }
          to="/login"
        >
          <FaUser className="inline m-1" />
          Sign In
        </NavLink>
      )}

      {userInfo && userInfo.isAdmin && (
        <NavDropDown text="Manage">
          <AdminItems />
        </NavDropDown>
      )}
    </div>
  );
};
export default NavTabs;

const NavDropDown = ({ text, children }) => {
  const [expanded, setExpanded] = useState(false);
  const dropdownRef = useRef(null);
  const onToggle = (val) => {
    setExpanded(val);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onToggle(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("scroll", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("scroll", handleOutsideClick);
    };
  }, [onToggle]);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        className="flex justify-center items-center p-2 focus:text-gray-300 text-gray-400"
        onClick={() => {
          onToggle(!expanded);
        }}
      >
        {text}
        {!expanded ? (
          <FaCaretDown className="ml-2"></FaCaretDown>
        ) : (
          <FaCaretUp className="ml-2"></FaCaretUp>
        )}
      </button>
      {expanded && (
        <div
          onClick={() => {
            onToggle(false);
          }}
          className="bg-gray-800 min-w-[160px] absolute left-2 top-10 z-[1000] hover:cursor-pointer rounded-md border-0 shadow-sm shadow-gray-900 outline-none"
        >
          {children}
        </div>
      )}
    </div>
  );
};
