import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ redirectTo, children }) => {
  const isLoggedIn = localStorage.getItem("jwtToken");
  if (!isLoggedIn && redirectTo === "/") {
    return <Navigate to="/" />;
  } else if (isLoggedIn && redirectTo === "/home") {
    return <Navigate to="/home" />;
  }
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectTo: PropTypes.string.isRequired,
};

export default ProtectedRoute;
