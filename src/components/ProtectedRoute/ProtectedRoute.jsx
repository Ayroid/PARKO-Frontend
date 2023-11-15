import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ redirectTo, children }) => {
  const jwtToken = localStorage.getItem("jwtToken");
  if (!jwtToken && redirectTo === "/auth") {
    return <Navigate to="/auth" />;
  } else if (jwtToken && redirectTo === "/") {
    return <Navigate to="/" />;
  }
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectTo: PropTypes.string.isRequired,
};

export default ProtectedRoute;
