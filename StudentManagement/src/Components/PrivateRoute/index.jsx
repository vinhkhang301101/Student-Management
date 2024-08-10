import { useAuthRedux } from "../../hooks/useAuthRedux";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = ({ redirect = "/" }) => {
  const { user } = useAuthRedux();

  if (!user) {
    return <Navigate to={redirect} />;
}
  return <Outlet />;
};