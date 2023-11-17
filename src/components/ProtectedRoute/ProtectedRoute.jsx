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

  const signUpPageRequested = path === "/auth" ? true : false;
  const runUseEffect = !signUpPageRequested;

  // ---------------------------- USE EFFECT ----------------------------

  useEffect(() => {
    const verifyToken = async () => {
      console.log("1. Verifying token");
      try {
        // ---------------------------- SERVER URL CONFIGURATION ----------------------------

        const SERVER_URL = import.meta.env.VITE_BACKEND_SERVER_URL;
        const verifyTokenURL = SERVER_URL + "/api/user/verify/token";

        // ---------------------------- VERIFY TOKEN ----------------------------

        let jwtToken = localStorage.getItem("jwtToken");
        let jwtRefreshToken = localStorage.getItem("jwtRefreshToken");

        console.log("2. jwtToken: ", jwtToken);
        console.log("3. jwtRefreshToken: ", jwtRefreshToken);

        if (jwtRefreshToken == null && jwtToken == null) {
          console.log("4. No token present");
          setVerified(false);
          return;
        }

        // REFRESH TOKEN IF TOKEN IS NOT PRESENT

        if (jwtToken == null) {
          console.log("4. Refreshing token");
          jwtToken = await refreshToken().then((ans) => {
            if (!ans) {
              console.log("4.1 Token refresh failed");
              setVerified(false);
            } else {
              console.log("4.2 Token refresh successful");
              setVerified(true);
              return;
            }
          });
        }

        // ---------------------------- RECEIVING RESPONSE ----------------------------

        console.log("4. Verifying token with server");
        const response = await axios.post(verifyTokenURL, null, {
          headers: {
            Authorization: jwtToken,
          },
        });

        // ---------------------------- SETTING VERIFIED ----------------------------

        if (response.status === 200) {
          console.log("5. Token verified successfully with server");
          setVerified(true);
        }
      } catch (error) {
        await refreshToken().then((ans) => {
          if (ans) {
            console.log("5. Token refresh successful");
            setVerified(true);
          } else {
            console.log("5. Token refresh failed");
            setVerified(false);
          }
        });
      } finally {
        console.log("6. Setting loading to false");
        setLoading(false);
      }
    };
    verifyToken();
  }, [runUseEffect]);

  // ---------------------------- RETURN ----------------------------

  if (!loading) {
    console.log("Sign Up Page Requested: ", signUpPageRequested);
    console.log("Loading: ", loading);
    console.log("verified: ", verified);
    if (signUpPageRequested && verified) {
      console.log("Redirecting to /");
      return <Navigate to="/" />;
    } else if (!signUpPageRequested && !verified) {
      console.log("Redirecting to /auth");
      return <Navigate to="/auth" />;
    }

    console.log("Returning children --------------");
    return children;
  }
};

// ---------------------------- PROPS ----------------------------

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
};

// ---------------------------- EXPORT ----------------------------

export default ProtectedRoute;
