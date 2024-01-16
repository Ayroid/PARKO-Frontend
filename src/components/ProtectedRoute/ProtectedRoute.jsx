import { Navigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { refreshToken } from "../../utils/AuthService";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ path, children }) => {
  // ---------------------------- STATE ----------------------------

  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  // ---------------------------- VARIABLES ----------------------------

  const signUpPageRequested = path === "/auth";

  // ---------------------------- USE EFFECT ----------------------------

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // ---------------------------- SERVER URL CONFIGURATION ----------------------------

        const SERVER_URL = import.meta.env.VITE_BACKEND_SERVER_URL;
        const verifyTokenURL = SERVER_URL + "/api/user/verify/token";

        // ---------------------------- VERIFY TOKEN ----------------------------

        let jwtToken = localStorage.getItem("jwtToken");
        const jwtRefreshToken = localStorage.getItem("jwtRefreshToken");

        if (jwtRefreshToken == null && jwtToken == null) {
          setVerified(false);
          return;
        }

        // ---------------------------- REFRESH TOKEN ----------------------------

        if (jwtToken == null) {
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
        console.log("Token Invalid!");
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
  });

  // ---------------------------- RETURN ----------------------------

  if (!loading) {
    if (signUpPageRequested && verified) {
      return <Navigate to="/" />;
    } else if (!signUpPageRequested && !verified) {
      return <Navigate to="/auth" />;
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
