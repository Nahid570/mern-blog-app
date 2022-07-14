import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoutes = () => {
  const { userAuth } = useSelector((state) => state?.users);
  return userAuth?.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default AdminRoutes;
