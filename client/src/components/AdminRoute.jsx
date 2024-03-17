import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const isAdmin = userInfo && userInfo.isAdmin;
  const component = isAdmin ? <Outlet /> : <Navigate to="/login" />;
  return component;
};
export default AdminRoute;
