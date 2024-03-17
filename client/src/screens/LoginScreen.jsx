import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../slices/usersApiSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
    // navigate if we get user info
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="m-10">
      <form
        onSubmit={submitHandler}
        className="md:mx-auto w-full px-5 md:w-1/2"
      >
        <h1 className="text-4xl font-semibold text-gray-500">Sign In</h1>
        <div className="mt-4 flex flex-col gap-y-2">
          <div className="flex flex-col">
            <label className="text-gray-500 ">Email Address</label>
            <input
              type="email"
              value={email}
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 text-gray-500 border border-gray-400 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
            />
            {/* <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
              Please provide a valid email address.
            </p> */}
          </div>
          <div className="flex flex-col">
            <label className="text-gray-500 ">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 text-gray-500 border border-gray-400 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="mt-2 p-2 text-gray-100 border rounded-md bg-gray-700 hover:bg-gray-800"
        >
          Sign In
        </button>
        {isLoading && <Loader />}
        <div className="mt-4 text-gray-500">
          New Customer?
          <NavLink
            className="ml-1 text-gray-800 underline"
            to={redirect ? `/register?redirect=${redirect}` : "/register"}
          >
            Register
          </NavLink>
        </div>
      </form>
    </div>
  );
};
export default LoginScreen;
