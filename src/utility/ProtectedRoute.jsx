
import { Navigate } from "react-router-dom";
// import { useContext } from "react";
// import { ProfileContext } from "../pages/ProfileProvider";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const reduxRole = useSelector((state) => state.role?.role); 
  const effectiveRole = reduxRole || localStorage.getItem('role') || localStorage.getItem('user_role') || '';
    
  if (!allowedRoles.includes(effectiveRole)) {
    return <Navigate to="/" replace />;
  }
  return children;
};


  export default ProtectedRoute;