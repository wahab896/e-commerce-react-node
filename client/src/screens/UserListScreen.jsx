import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../slices/usersApiSlice";
import Loader from "../components/Loader";
import ErrorBox from "../components/ErrorBox";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const UserListScreen = () => {
  const { data: users, error, isLoading, refetch } = useGetUsersQuery();

  const [deleteUsers] = useDeleteUserMutation();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        const data = await deleteUsers(id).unwrap();
        refetch();
        toast.success(data.message, { delay: 800 });
      } catch (err) {
        toast.error(err?.data?.message || err?.error);
      }
    }
  };

  const loadOrError = isLoading ? (
    <Loader />
  ) : error ? (
    <ErrorBox msg={error?.data?.message || error?.error} />
  ) : (
    false
  );

  return (
    <div className="w-full px-2 md:px-20 overflow-auto">
      <h1 className="text-4xl mt-5 font-semibold text-gray-500">Users</h1>
      {loadOrError || (
        <table className="w-full mt-4 table-auto">
          <thead>
            <tr className="">
              <th className="p-1 border border-slate-400">ID</th>
              <th className="p-1 border border-slate-400">Name</th>
              <th className="p-1 border border-slate-400">Email</th>
              <th className="p-1 border border-slate-400">isAdmin</th>
              <th className="p-1 border border-slate-400"></th>
            </tr>
          </thead>
          <tbody>
            {users?.map((u, i) => {
              return (
                <tr
                  key={u._id}
                  className={`text-center text-gray-600 text-sm whitespace-break-spaces hover:bg-gray-200 ${
                    i % 2 == 0 ? "bg-gray-100" : ""
                  }`}
                >
                  <td className="p-1 border border-slate-400">{u._id}</td>
                  <td className="p-1 border border-slate-400">{u.name}</td>
                  <td className="p-1 border border-slate-400">
                    <a className="underline" href={`mailto:${u.email}`}>
                      {u.email}
                    </a>
                  </td>
                  <td className="p-1 border border-slate-400 text-xl">
                    {u.isAdmin ? (
                      <FaCheck className="mx-auto text-green-600" />
                    ) : (
                      <FaTimes className="mx-auto text-red-600" />
                    )}
                  </td>
                  <td className="p-1 border border-slate-400">
                    <div className="flex justify-center items-center">
                      <NavLink
                        className="inline-block hover:cursor-pointer p-1.5 mr-2 hover:bg-slate-300"
                        to={`/admin/user/${u._id}/edit`}
                      >
                        <FaEdit className="text-black text-md" />
                      </NavLink>
                      <button
                        className="hover:cursor-pointer bg-red-500 hover:bg-red-400 p-2 border rounded-md"
                        onClick={() => handleDelete(u._id)}
                      >
                        <FaTrash className="text-gray-200  text-md" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default UserListScreen;
