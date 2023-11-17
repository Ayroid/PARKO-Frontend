import axios from "axios";

const SERVER_URL = import.meta.env.VITE_BACKEND_SERVER_URL;
const refreshTokenURL = `${SERVER_URL}/api/user/refreshToken`;

const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("jwtRefreshToken");

    const response = await axios.post(refreshTokenURL, null, {
      headers: {
        Authorization: refreshToken,
      },
    });

    if (response.status === 200) {
      const newToken = response.data.token;
      localStorage.setItem("jwtToken", newToken);
      return newToken;
    }
  } catch (error) {
    return false;
  }
};

export { refreshToken };
