import { useAuthRedux } from "../../hooks/useAuthRedux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const GuestRoute = ({ redirect = "/ " }) => {
  const { user } = useAuthRedux();
  const { state } = useLocation();
  if (user) return <Navigate to={state?.redirect || redirect} />;

  return <Outlet />;
};
