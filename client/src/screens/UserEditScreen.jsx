import { useEffect, useId, useState } from "react";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../slices/usersApiSlice";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import ErrorBox from "../components/ErrorBox";

const UserEditScreen = () => {
  const { id } = useParams();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const adminFieldID = useId();

  console.log({ name, email, isAdmin });

  const { data: user, isLoading, refetch, error } = useGetUserDetailsQuery(id);

  const [updatedUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setName(user.name);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updatedUser({ id, name, email, isAdmin });
      toast.success("User updated successfully");
      refetch();
      navigate("/admin/userlist");
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  const loadOrError =
    isLoading || loadingUpdate ? (
      <Loader />
    ) : error ? (
      <ErrorBox msg={error?.data?.message || error?.error} />
    ) : (
      false
    );

  return (
    <div className="mt-10 w-full px-2 md:px-20">
      <NavLink
        className="p-3 mx-5 bg-slate-200 hover:bg-slate-300 border rounded-md"
        to="/admin/userlist"
      >
        Go Back
      </NavLink>
      {loadOrError || (
        <form
          onSubmit={submitHandler}
          className="md:mx-auto w-full mt-5 px-5 md:w-1/2"
        >
          <h1 className="text-4xl font-semibold text-gray-500">Edit User</h1>
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
            <div>
              <input
                checked={isAdmin}
                type="checkbox"
                name="isAdmin"
                id={adminFieldID}
                onChange={(e) => {
                  setIsAdmin(e.target.checked);
                }}
              />
              <label htmlFor={adminFieldID} className="ml-1">
                Is Admin
              </label>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 p-2 text-gray-100 border rounded-md bg-gray-700 hover:bg-gray-800"
          >
            Update
          </button>
          {isLoading && <Loader />}
        </form>
      )}
    </div>
  );
};
export default UserEditScreen;
