import { Navigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { refreshToken } from "../../utils/AuthService";
import { useEffect, useState } from "react";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const ProtectedRoute = ({ path, children }) => {
  // ---------------------------- STATE ----------------------------

  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  // ---------------------------- VARIABLES ----------------------------

  const signUpPageRequested = path === "/auth" ? true : false;
  const runUseEffect = !signUpPageRequested;

  // ---------------------------- USE EFFECT ----------------------------

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // ---------------------------- SERVER URL CONFIGURATION ----------------------------

        const SERVER_URL = import.meta.env.VITE_BACKEND_SERVER_URL;
        const verifyTokenURL = SERVER_URL + "/api/user/verify/token";

        // ---------------------------- VERIFY TOKEN ----------------------------

        let jwtToken = localStorage.getItem("jwtToken");

        // REFRESH TOKEN IF TOKEN IS NOT PRESENT

        if (!jwtToken) {
          jwtToken = await refreshToken().then((ans) => {
            if (!ans) {
              setVerified(false);
            } else {
              setVerified(true);
              return;
            }
          });
        }

        // ---------------------------- RECEIVING RESPONSE ----------------------------

        const response = await axios.post(verifyTokenURL, null, {
          headers: {
            Authorization: jwtToken,
          },
        });

        // ---------------------------- SETTING VERIFIED ----------------------------

        if (response.status === 200) {
          setVerified(true);
        }
      } catch (error) {
        await refreshToken().then((ans) => {
          if (ans) {
            setVerified(true);
          } else {
            setVerified(false);
          }
        });
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, [runUseEffect]);

  // ---------------------------- LOADING ----------------------------

  if (loading) {
    return <LoadingSpinner />;
  }

  // ---------------------------- RETURN ----------------------------

  if (signUpPageRequested) {
    if (verified) {
      return <Navigate to="/" replace />;
    } else {
      return children;
    }
  } else {
    if (!verified) {
      return <Navigate to="/auth" replace />;
    } else {
      return children;
    }
  }
};

// ---------------------------- PROPS ----------------------------

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
};

// ---------------------------- EXPORT ----------------------------

export default ProtectedRoute;
