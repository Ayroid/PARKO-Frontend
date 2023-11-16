import axios from "axios";

const SERVER_URL = import.meta.env.VITE_BACKEND_SERVER_URL;
const refreshTokenURL = `${SERVER_URL}/api/user/refreshToken`;

const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("jwtRefreshToken");
    console.log("6. Refresh token:", refreshToken);

    console.log("7. Sending refresh token to server...");
    const response = await axios.post(refreshTokenURL, null, {
      headers: {
        Authorization: refreshToken,
      },
    });

    if (response.status === 200) {
      const newToken = response.data.token;
      console.log("8. Refresh token success");
      localStorage.setItem("jwtToken", newToken);
      return newToken;
    }
  } catch (error) {
    console.log("8. Token refresh failed:", error);
    return false;
  }
};

export { refreshToken };
