import { Navigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { refreshToken } from "../../utils/AuthService";
import { useEffect, useState } from "react";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const ProtectedRoute = ({ path, children }) => {
  // console.log(children);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const signUpPageRequested = path === "/auth" ? true : false;
  const runUseEffect = !signUpPageRequested;

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const SERVER_URL = import.meta.env.VITE_BACKEND_SERVER_URL;
        const verifyTokenURL = SERVER_URL + "/api/user/verify/token";

        let jwtToken = localStorage.getItem("jwtToken");
        // console.log("2. jwtToken", jwtToken);

        // If the access token is not present or expired, attempt to refresh it
        if (!jwtToken) {
          // console.log("3. jwtToken is null");
          jwtToken = await refreshToken().then((ans) => {
            if (!ans) {
              setVerified(false);
            } else {
              setVerified(true);
              return;
            }
          });
        }

        // console.log("4. Sending request to verify token");
        const response = await axios.post(verifyTokenURL, null, {
          headers: {
            Authorization: jwtToken,
          },
        });

        if (response.status === 200) {
          setVerified(true);
          // console.log("5. Token Verified");
        }
      } catch (error) {
        // console.log("5. Protected route access failed:", error);
        await refreshToken().then((ans) => {
          // console.log("9. Refresh token response", ans);
          if (ans) {
            // console.log("10. Refresh token success");
            setVerified(true);
          } else {
            // console.log("10. Refresh token failed");
            setVerified(false);
          }
        });
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, [runUseEffect]);

  if (loading) {
    // console.log("1. Loading");
    return <LoadingSpinner />;
  }

  if (signUpPageRequested) {
    // console.log("1. SignUp page requested");

    if (verified) {
      // console.log("12. Token verified, redirecting to Home");
      return <Navigate to="/" replace />;
    } else {
      // console.log("12. Token not verified, returning children");
      return children;
    }
  } else {
    // console.log("1. Home page requested");

    if (!verified) {
      // console.log("9. Token not verified, redirecting to /auth 1");
      return <Navigate to="/auth" replace />;
    } else {
      // console.log("8. Token verified, returning children", children);
      return children;
    }
  }
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
};

export default ProtectedRoute;
