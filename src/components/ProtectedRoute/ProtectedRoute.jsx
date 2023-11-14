import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ redirectTo, children }) => {
  const jwtToken = localStorage.getItem("jwtToken");
  if (!jwtToken && redirectTo === "/") {
    return <Navigate to="/" />;
  } else if (jwtToken && redirectTo === "/home") {
    return <Navigate to="/home" />;
  }
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectTo: PropTypes.string.isRequired,
};

export default ProtectedRoute;
