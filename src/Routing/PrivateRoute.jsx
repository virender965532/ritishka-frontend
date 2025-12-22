import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state?.userData?.user);
  if (user?._id && (user?.role === "ADMIN" || user?.role === "SUPERADMIN")) {
    return children;
  } else if (user?._id && user?.role === "USER") {
    return children;
  }
  return <Navigate to="/login" replace />;
};

export default PrivateRoute;