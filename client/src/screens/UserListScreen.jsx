import { useGetUsersQuery } from "../slices/usersApiSlice";
import Loader from "../components/Loader";

const UserListScreen = () => {
  const { data: users, error, isLoading, refetch } = useGetUsersQuery();
  console.log(users);
  const loadOrError = isLoading ? (
    <Loader />
  ) : error ? (
    <div>{error?.data?.message || error?.error}</div>
  ) : (
    false
  );
  return (
    loadOrError || (
      <table className="m-auto w-11/12 mt-20 table-auto">
        {/* {users} */}
        <thead>
          <tr className="">
            <th className="px-2 pt-2 border border-slate-600">ID</th>
            <th className="px-2 pt-2 border border-slate-600">Name</th>
            <th className="px-2 pt-2 border border-slate-600">Email</th>
            <th className="px-2 pt-2 border border-slate-600">isAdmin</th>
            <th className="px-2 pt-2 border border-slate-600"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-slate-700">ID</td>
            <td className="border border-slate-700">Name</td>
            <td className="border border-slate-700">Email</td>
            <td className="border border-slate-700">isAdmin</td>
            <td className="border border-slate-700">akjsd</td>
          </tr>
        </tbody>
      </table>
    )
  );
};
export default UserListScreen;
