import { useState } from "react";

import Login from "./Login/Login";
import Register from "./Register/Register";

// import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [loginPage, setLoginPage] = useState(true);

  const changePageComponent = (value) => {
    setLoginPage(value);
  };

  return (
    <div>
      {loginPage ? (
        <div>
          <Login changePage={changePageComponent} />
        </div>
      ) : (
        <Register changePage={changePageComponent} />
      )}

      {/* <ToastContainer position="top-center" /> */}
    </div>
  );
};

export default SignUp;
