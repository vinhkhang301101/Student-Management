import { useAuthRedux } from "../../hooks/useAuthRedux";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = ({ redirect = "/" }) => {
  const { user } = useAuthRedux();

  if (!user) {
    message.warning("Login first!!!");
    return <Navigate to={redirect} />;
}
  return <Outlet />;
};