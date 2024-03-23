import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useUpdateProfileMutation } from "../slices/usersApiSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [
    updateProfile,
    { isLoading: profileLoading },
  ] = useUpdateProfileMutation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo.name, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords does not match");
    } else {
      try {
        const res = await updateProfile({
          id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err?.message);
      }
    }
  };

  return (
    <div className="grid md:grid-cols-4 gap-10 w-full mt-4 px-2 md:px-20">
      <form onSubmit={submitHandler} className="md:mx-auto w-full">
        <h1 className="text-4xl font-semibold text-gray-500">User Profile</h1>
        <div className="mt-4 flex flex-col gap-y-2">
          <div className="flex flex-col">
            <label className="text-gray-500">Name</label>
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
          disabled={profileLoading}
          className="mt-2 p-2 text-gray-100 border rounded-md bg-gray-700 hover:bg-gray-800"
        >
          Update
        </button>
        {profileLoading && <Loader />}
      </form>
      <div className="md:col-span-3">
        <h1 className="text-4xl font-semibold text-gray-500">My orders</h1>
      </div>
    </div>
  );
};
export default ProfileScreen;
