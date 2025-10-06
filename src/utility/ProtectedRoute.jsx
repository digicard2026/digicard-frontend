
import { Navigate } from "react-router-dom";
// import { useContext } from "react";
// import { ProfileContext } from "../pages/ProfileProvider";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, allowedRoles }) => {
  console.log(allowedRoles);
  const role = useSelector((state) => state.role.role); 

  //  const { role } = useContext(ProfileContext);

   console.log('role',role);
    
    if (!allowedRoles.includes(role)) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  export default ProtectedRoute;