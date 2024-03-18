import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import Loader from "../components/Loader";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const [registerApi, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {}, [redirect]);

  const submitHandler = async (e) => {
    console.log("test", { password, confirmPassword });
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords does not match");
    } else {
      try {
        const res = await registerApi({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err?.error);
      }
    }
  };

  return (
    <div className="mt-10">
      <form
        onSubmit={submitHandler}
        className="md:mx-auto w-full px-5 md:w-1/2"
      >
        <h1 className="text-4xl font-semibold text-gray-500">Register</h1>
        <div className="mt-4 flex flex-col gap-y-2">
          <div className="flex flex-col">
            <label className="text-gray-500 ">Name</label>
            <input
              className="mt-2 text-gray-500 border border-gray-400 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-500">Email Address</label>
            <input
              className="mt-2 text-gray-500 border border-gray-400 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter Email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-500 ">Password</label>
            <input
              className="mt-2 text-gray-500 border border-gray-400 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-500 ">Confirm Password</label>
            <input
              className="mt-2 text-gray-500 border border-gray-400 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 p-2 text-gray-100 border rounded-md bg-gray-700 hover:bg-gray-800"
        >
          Register
        </button>
        {isLoading && <Loader />}
        <div className="mt-4 text-gray-500">
          Already have an account?
          <NavLink
            className="ml-1 text-gray-800 underline"
            to={redirect ? `/login?redirect=${redirect}` : "/login"}
          >
            Login
          </NavLink>
        </div>
      </form>
    </div>
  );
};
export default RegisterScreen;
