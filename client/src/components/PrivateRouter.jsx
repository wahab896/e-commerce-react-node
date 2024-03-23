import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const component = userInfo ? <Outlet /> : <Navigate to="/login" />;
  return component;
};
export default PrivateRoute;
